import dotenv from 'dotenv';
dotenv.config({ path: './bd.env' });

import pkg from 'pg';
const { Pool } = pkg;

const CONNECTION_STRING = process.env.CONNECTION_STRING;

export const pool = new Pool({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
});