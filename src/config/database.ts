import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config(); 


export const pool = createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT), 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});
