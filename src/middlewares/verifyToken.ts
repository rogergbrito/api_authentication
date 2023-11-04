import { NextFunction, Response, Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../database/connect';

dotenv.config();

export async function verifyToken(req: Request, res: Response, next: NextFunction) {

  const authorization = req.headers.authorization;

  if (!authorization) return res.status(401).json({ message: "Token not sent" });

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer') return res.status(401).json({ message: "Unsuported authorization type" });

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);

    if (!decodedToken) return res.status(401).json({ message: "Invalid token" });

    const { id, email, admin } = decodedToken as JwtPayload;

    const query = `
    SELECT *
    FROM users
    WHERE id = $1
    and email = $2;
    `

    const result = await pool.query(query, [id, email]);

    if (result.rowCount === 0) return res.status(401).json({ message: "Invalid or deleted user" });

    if (admin === false) return res.status(401).json({ message: "User without permission" });

    return next();

  } catch(error) {
    console.log(error);
    return res.status(500).json({ message: "Expired or invalid token" });
  }
}
