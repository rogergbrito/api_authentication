import { Response, Request } from 'express';
import { SignupUserInterface } from '../interfaces/userInterface';
import pool from '../database/connect';
import { generateHash } from '../functions/security';

export async function signup(req: Request, res: Response) {
  try {
    const user: SignupUserInterface = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }

    if(!user.name || !user.email || !user.password) return res.status(400).json({ error: "User not sent correctly" });

    const hashedPassword = await generateHash(user.password);

    const queryInsert = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3);
    `;

    const querySelect = `
    SELECT *
    FROM users
    WHERE email = $1;
    `;

    const userAlreadyExists = await pool.query(querySelect, [user.email]);

    if (userAlreadyExists.rowCount >= 1) return res.status(400).json({ error: "User already exists" });

    const result = await pool.query(queryInsert, [user.name, user.email, hashedPassword]);

    if (result.rowCount === 0) return res.status(400).json({ error: "Error creating user" });

    return res.status(201).json({ message: "Created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "API error" });
  };
};