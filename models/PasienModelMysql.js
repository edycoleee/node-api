//models/PasienModelMysql.js
import { Request } from "tedious";
export const getExecuteStatement = (connection, query) =>
  new Promise((resolve, reject) => {
    const request = new Request(query, (err, rowCount) => {
      if (err) {
        console.log(err)
      } else {
        console.log(`${rowCount} rows `)
        resolve(result);
      }
    })

    var result = [];
    request.on('row', columns => {
      var objt = {};
      columns.forEach(column => {
        objt[column.metadata.colName] = column.value;
      });
      result.push(objt);
      console.log(result);
    });
    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function (rowCount, more) {
      connection.close();
    });

    connection.on('connect', function (err) {
      console.log("mbuh");
      if (err) {
        reject(err);
      } else {
        console.log("Connect");
        connection.execSql(request)
      }
    })

    connection.connect();
  })
