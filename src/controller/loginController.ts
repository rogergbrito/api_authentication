import { Request, Response } from 'express';
import dotenv from 'dotenv';
import pool from '../database/connect';
import { LoginUserInterface } from '../interfaces/requestInterface';
import { verifyHash, signToken } from '../functions/security';

dotenv.config();

export async function login(req: Request, res: Response) {
  
  try {
    const { email, password }: LoginUserInterface = req.body;

    if (!email || !password) return res.status(401).json({ message: "Incorrect email or password" });

    const query = `
    SELECT *
    FROM users
    WHERE email = $1;`;

    const result = await pool.query(query, [email]);

    if (result.rowCount === 0) return res.status(401).json({ message: "Unregistered user" });

    const hashedPassword = result.rows[0].password;

    const passwordMatch = await verifyHash(password, hashedPassword);

    if (!passwordMatch) return res.status(401).json({ message: "Incorrect email or password" });

    const { id, role } = result.rows[0];

    const token = signToken({ id, email, role });

    return res.status(200).json({ token });
  } catch(error) {
    console.log(error);
    return res.status(500).json({ message: "API error" });
  };
};