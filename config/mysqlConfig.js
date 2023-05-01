//config/mysqlConfig.js
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();
const dbPool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "super-password1",
  database: process.env.DB_NAME || "patientsdb",
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 200
});
export default dbPool;
