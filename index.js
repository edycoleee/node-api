//index.js
import express from "express";
import ip from "ip";
import PasienRouter from "./routes/PasienRoute.js";
import cors from "cors";
import { logger } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import config from "./config/mssqlConfig.js";
import { Connection } from "tedious";

const app = express()
app.use(cors({ origin: '*' }))

//menjalankan middleware
app.use(logger)
app.use(express.json())

//GET RESPONSE => STRING
app.get('/', (req, res, next) => {
  res.send('Response tanpa Router')
})

app.use("/dtpasien", PasienRouter)

app.get('/coba', (req, res, next) => {
  var connection = new Connection(config);
  console.log("COBA1");
  //set up the connection information    
  connection.on('connect', function (err) {
    if (err) console.log(err);
    console.log("COBA1 Connected");
    connection.close();
  });
  connection.connect();
  res.send('Connected')
})

const PORT = 3500
app.use(errorHandler)
app.listen(PORT, () => console.log(`Server running on: ${ip.address()}:${PORT}`))
