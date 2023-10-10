import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function generateHash(password: string) {
  return await bcrypt.hash(password, 10);
};

export async function verifyHash(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
};

export function signToken(payload: object) {
  return jwt.sign(payload, process.env.TOKEN_SECRET!, { expiresIn: '1h' });
};
