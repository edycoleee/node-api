//controller/PasienControllerMssql.js
import config from '../config/mssqlConfig.js';
//var Connection = require('tedious').Connection;
import { Connection } from "tedious";
import { getExecuteStatement } from '../models/PasienModelMysql.js';

const HttpStatus = {
  OK: { code: 200, status: 'OK' },
  CREATED: { code: 201, status: 'CREATED' },
  NO_CONTENT: { code: 204, status: 'NO_CONTENT' },
  BAD_REQUEST: { code: 400, status: 'BAD_REQUEST' },
  NOT_FOUND: { code: 404, status: 'NOT_FOUND' },
  INTERNAL_SERVER_ERROR: { code: 500, status: 'INTERNAL_SERVER_ERROR' }
};
function ResponseServer(statusCode, httpStatus, message, data) {
  return ({
    timeStamp: new Date().toLocaleString(),
    response: data,
    metaData: {
      status: httpStatus,
      code: statusCode,
      message
    }
  })
}



function getPatients(req, res) {
  var query = "SELECT * FROM TB_COBA"
  const connection = new Connection(config)
  const taskDbseCmmd = async () => {
    console.log('kelas1');
    try {
      const results = await getExecuteStatement(connection, query);
      //console.log("data:", JSON.stringify(data));
      //res.json(data)
      //return data;

      if (!results) {
        return res.status(HttpStatus.OK.code)
          .send(ResponseServer(HttpStatus.OK.code, HttpStatus.OK.status, `No patients found`));
      }
      res.status(HttpStatus.OK.code)
        .send(ResponseServer(HttpStatus.OK.code, HttpStatus.OK.status, "get all Data Pasien", results));

    } catch (error) {
      //throw (error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(ResponseServer(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred ${error.message}`));
    }
  };
  taskDbseCmmd();
}

function getPatient(req, res) {
  const { id } = req.params;
  var query = `SELECT * FROM TB_COBA WHERE id = ${id}`;
  const connection = new Connection(config)
  const taskDbseCmmd = async () => {
    try {
      const results = await getExecuteStatement(connection, query);
      //console.log("data:", JSON.stringify(data));
      //res.json(data)
      //return data;
      console.log("HASIL", typeof (results), results, results.length);
      if (!results || results.length === 0) {
        return res.status(HttpStatus.OK.code)
          .send(ResponseServer(HttpStatus.OK.code, HttpStatus.OK.status, `No patients found`));
      }
      res.status(HttpStatus.OK.code)
        .send(ResponseServer(HttpStatus.OK.code, HttpStatus.OK.status, "get Data Pasien by ID", results));

    } catch (error) {
      //throw (error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(ResponseServer(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred ${error.message}`));
    }
  };
  taskDbseCmmd();
}

function createPatient(req, res) {
  //console.log(req.body);
  const { id, nama, alamat } = req.body
  var query = `INSERT INTO TB_COBA (id, nama, alamat) VALUES (${id}, '${nama}', '${alamat}')`;
  const connection = new Connection(config)
  const taskDbseCmmd = async () => {
    try {
      const data = await getExecuteStatement(connection, query);
      //console.log("data:", JSON.stringify(data));
      res.json(data)
      //return data;
    } catch (error) {
      throw (error)
    }
  };
  taskDbseCmmd();
}

function updatePatient(req, res) {
  const { id } = req.params;
  const { nama, alamat } = req.body
  console.log("DATA", id, nama, alamat);
  var query = `UPDATE TB_COBA SET nama = '${nama}' , alamat = '${alamat}' WHERE id = ${id}`;
  const connection = new Connection(config)
  const taskDbseCmmd = async () => {
    try {
      const data = await getExecuteStatement(connection, query);
      //console.log("data:", JSON.stringify(data));
      res.json(data)
      //return data;
    } catch (error) {
      throw (error)
    }
  };
  taskDbseCmmd();
}

function deletePatient(req, res) {
  const { id } = req.params;
  var query = `DELETE FROM TB_COBA WHERE id = ${id}`;
  const connection = new Connection(config)
  const taskDbseCmmd = async () => {
    try {
      const data = await getExecuteStatement(connection, query);
      //console.log("data:", JSON.stringify(data));
      res.json(data)
      //return data;
    } catch (error) {
      throw (error)
    }
  };
  taskDbseCmmd();
}

export { getPatients, getPatient, createPatient, updatePatient, deletePatient };