//index.js
import express from "express";
import ip from "ip";
import PasienRouter from "./routes/PasienRoute.js";
import cors from "cors";
import { logger } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import mysql from 'mysql2';

const app = express()
app.use(cors({ origin: '*' }))
//koneksi mysql db
const dbPool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "760410",
  database: "patientsdb",
  connectionLimit: 20
});


//menjalankan middleware
app.use(logger)
app.use(express.json())

//GET RESPONSE => STRING
app.get('/', (req, res, next) => {
  res.send('Response tanpa Router')
})
app.use("/coba", (req, res, next) => {
  dbPool.execute('SELECT * FROM patients', (err, rows) => {
    if (err) {
      res.json({ message: 'connection failed' })
    }
    res.json({ message: 'connection success', data: rows })
  })
})

app.use("/dtpasien", PasienRouter)
const PORT = 3500
app.use(errorHandler)
app.listen(PORT, () => console.log(`Server running on: ${ip.address()}:${PORT}`))
