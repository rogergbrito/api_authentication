import { Request, Response } from 'express';
import pool from '../database/connect';
import { UpdateUserInterface } from '../interfaces/userInterface';

export async function getAllUsers(req: Request, res: Response) {

  try {
    const query = `
    SELECT id, name, email, active, role
    FROM users
    ORDER BY id ASC;
    `

    const result = await pool.query(query);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Users not found' });
    }

    return res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error when searching for users' });
  };
};

export async function getUserById(req: Request, res: Response) {

  const userId = req.params.id;

  try {
    const query = `
    SELECT id, name, email, active, role
    FROM users
    WHERE id = $1;`

    const result = await pool.query(query, [userId]);

    if (result.rowCount === 0) return res.status(404).json({ "error": "User not found" });

    return res.status(200).json(result.rows);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "API error" });
  };
};

export async function updateUserPut(req: Request, res: Response) {

  try {
    const id = req.params.id;

    const user: UpdateUserInterface = {
      name: req.body.name,
      email: req.body.email,
      active: req.body.active,
      role: req.body.role
    };

    if (!user.name || !user.email || !user.role) return res.status(400).json({ error: "User not sent correctly" });

    if (user.active !== true && user.active !== false) return res.status(400).json({ error: "Active parameter must be boolean" });
    if (user.role !== 'admin' && user.role !== 'regular') return res.status(400).json({ error: "Role parameter must be admin or regular" });

    const query = `
    UPDATE users 
    SET name = $1, email = $2, active = $3, role = $4
    WHERE id = $5;
    `;

    const result = await pool.query(query, [user.name, user.email, user.active, user.role, id]);

    if (result.rowCount === 0) return res.status(400).json({ error: "Error updating user" });

    return res.status(200).json({ message: "Updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "API error" });
  };
};

export async function updateUserPatch(req: Request, res: Response) {

  try {
    const id = req.params.id;

    const user: UpdateUserInterface = {
      name: req.body.name,
      email: req.body.email,
      active: req.body.active,
      role: req.body.role
    };

    if (!user.name && !user.email && !user.role && user.active === undefined) return res.status(400).json({ error: "User not sent correctly" });

    if (user.active !== true && user.active !== false && user.active !== undefined ) return res.status(400).json({ error: "Active parameter must be boolean" });
    if (user.role !== 'admin' && user.role !== 'regular' && user.role !== undefined) return res.status(400).json({ error: "Role parameter must be admin or regular" });

    const querySelect = `
    SELECT *
    FROM users
    WHERE id = $1;
    `;

    const databaseUser = await pool.query(querySelect, [id]);

    if (databaseUser.rowCount === 0) return res.status(404).json({ error: "User does not exist" });

    const queryUpdate = `
    UPDATE users
    SET name = $1, email = $2, active = $3, role = $4
    WHERE id = $5;
    `;

    if (!user.name) user.name = databaseUser.rows[0].name;
    if (!user.email) user.email = databaseUser.rows[0].email;
    if (user.active !== false && user.active !== true) user.active = databaseUser.rows[0].active;
    if (!user.role) user.role = databaseUser.rows[0].role;

    const result = await pool.query(queryUpdate, [user.name, user.email, user.active, user.role, id]);

    if (result.rowCount === 0) return res.status(404).json({ error: "Error updating user" });

    return res.status(200).json({ message: "Updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "API error" });
  };
};

export async function deleteUser(req: Request, res: Response) {
  try {

    const id = req.params.id;

    const querySelect = `
    SELECT *
    FROM users
    WHERE id = $1;
    `;

    const userExists = await pool.query(querySelect, [id]);   

    if (userExists.rowCount === 0) return res.status(404).json({ error: "User not found" });

    const queryDelete = `
    DELETE FROM users
    WHERE id = $1;
    `;

    const result = await pool.query(queryDelete, [id]);

    if (result.rowCount === 0) return res.status(404).json({ error: "User not deleted" });

    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "API error" });
  };
};
