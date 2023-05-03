//index.js
import express from "express";
import ip from "ip";
//import PasienRouter from "./routes/PasienRoute.js";
import cors from "cors";
import { logger } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express()
app.use(cors({ origin: '*' }))

//menjalankan middleware
app.use(logger)
app.use(express.json())

//GET RESPONSE => STRING
app.get('/', (req, res, next) => {
  res.send('Response tanpa Router')
})

//app.use("/dtpasien", PasienRouter)
const PORT = 3500
app.use(errorHandler)
app.listen(PORT, () => console.log(`Server running on: ${ip.address()}:${PORT}`))
