//middleware/logKyle.js
//npm i moment
import moment from 'moment'
const logKyle = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${req.originalUrl
    }: ${moment().format()}`
  );
  next();
};

export default logKyle
