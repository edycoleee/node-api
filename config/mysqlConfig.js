import mysql from 'mysql2';
import dotenv from 'dotenv';

// PORT = 4000
// DB_HOST = localhost
// DB_USERNAME = root
// DB_PASSWORD = 760410
// DB_NAME = express_mysql


dotenv.config();

const dbPool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  //port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "760410",
  database: process.env.DB_NAME || "patientsdb",
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 200
});
export default dbPool;
