import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: 'app_authentication',
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
})

pool.connect()
  .then(() => {
    console.log('Connected with database');
  })
  .catch((error) => {
    console.log('Error connecting to database', error);
  })

export default pool;