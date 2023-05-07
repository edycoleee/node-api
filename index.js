//index.js => node-mongo-auth
import express from "express";
import ip from "ip";
import PasienRouter from "./routes/PasienRoute.js";
import cors from "cors";
import mongoose from "mongoose";
import { logger } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import { mongoURL } from "./config/mongoConfig.js";
import userRouter from "./routes/userRoutes.js";
import noteRouter from "./routes/noteRoutes.js";

const app = express()
app.use(cors({ origin: '*' }))
//koneksi mongo db
const connectWithRetry = () => {
  mongoose
    .connect(mongoURL)
    .then(() => console.log("Sukses Koneksi MongoDB Rev"))
    .catch((e) => {
      console.log(e)
      setTimeout(connectWithRetry, 5000)
    })
}

connectWithRetry()

//menjalankan middleware
app.use(logger)
app.use(express.json())

//GET RESPONSE => STRING
app.get('/', (req, res, next) => {
  res.send('Response tanpa Router')
})
app.use("/dtpasien", PasienRouter)
app.use("/user", userRouter)
app.use("/note", noteRouter)

const PORT = 3500
app.use(errorHandler)
app.listen(PORT, () => console.log(`Server running on: ${ip.address()}:${PORT}`))
