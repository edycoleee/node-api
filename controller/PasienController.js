//controller/PasienController.js
import {
  getdbPasienAll,
  getdbPasienAllCari,
  getdbPasienId, getdbPasienAktif,
  createdbPasien, deldbPasienId, updatedbPasien
} from "../models/PasienModelDm.js";

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
// 1,7. find all Data Pasien which alamat contains ’semarang’
export const getPatients = (req, res) => {
  if (req.query.alamat === undefined) {
    try {
      //1. Get all Data Pasien
      const data = getdbPasienAll()
      console.log(data, typeof (data));
      //1a. Jika Data Kosong
      if (!data || data.length === 0) {
        return res.status(HttpStatus.OK.code)
          .send(ResponseServer(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status, "tidak ada Data Pasien", data));
      }
      //1b. Jika Terdapat Isi Data
      return res.status(HttpStatus.OK.code)
        .send(ResponseServer(HttpStatus.OK.code, HttpStatus.OK.status, "get all Data Pasien", data));
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(ResponseServer(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred ${error.message}`));
    }
  } else {
    //7. Get all Data Pasien which alamat contains ’semarang’
    try {
      //7. Get all Data Pasien
      const data = getdbPasienAllCari(req.query.alamat)
      //7a. Jika Data Kosong
      console.log(data, typeof (data), data.length);
      if (!data || data.length === 0) {
        return res.status(HttpStatus.OK.code)
          .send(ResponseServer(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status, "tidak ada Data Pasien", data));
      }
      //7b. Jika Terdapat Isi Data
      res.status(HttpStatus.OK.code)
        .send(ResponseServer(HttpStatus.OK.code, HttpStatus.OK.status, `get all Data Pasien,alamat : ${req.query.alamat}`, data));
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(ResponseServer(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred ${error.message}`));
    }
  }
}
// 6. find all aktif Data Pasien
export const getPatientsAktif = (req, res) => {
  try {
    const data = getdbPasienAktif()
    console.log(data);
    //2a. Jika Data Kosong
    if (!data || data.length === 0) {
      return res.status(HttpStatus.OK.code)
        .send(ResponseServer(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status, "tidak ada Data Pasien", data));
    }
    //2b. Jika Terdapat Isi Data
    return res.status(HttpStatus.OK.code)
      .send(ResponseServer(HttpStatus.OK.code, HttpStatus.OK.status, "get Data Pasien Aktif", data));
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
      .send(ResponseServer(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred ${error.message}`));
  }
}
// 3. add new Data Pasien
export const createPatient = (req, res) => {
  const dataPasien = req.body;
  console.log(dataPasien);
  if (!dataPasien.nama || !dataPasien.alamat) {
    return res.status(HttpStatus.BAD_REQUEST.code)
      .send(ResponseServer(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, "Anda mengirimkan data yang salah", null));
  }
  try {
    const data = createdbPasien(dataPasien)
    console.log(data, typeof (data), data.length);
    res.status(HttpStatus.CREATED.code)
      .send(ResponseServer(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'Data Pasien Created', null));
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
      .send(ResponseServer(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred ${error.message}`));
  }
}
// 2. get Data Pasien by id
export const getPatient = (req, res) => {
  try {
    const data = getdbPasienId(req.params.id)
    console.log(data);
    //2a. Jika Data Kosong
    if (!data || data.length === 0) {
      return res.status(HttpStatus.OK.code)
        .send(ResponseServer(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status, "tidak ada Data Pasien", data));
    }
    //2b. Jika Terdapat Isi Data
    return res.status(HttpStatus.OK.code)
      .send(ResponseServer(HttpStatus.OK.code, HttpStatus.OK.status, "get Data Pasien by ID", data));
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
      .send(ResponseServer(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred ${error.message}`));
  }
}
// 4. delete Data Pasien by id
export const deletePatient = (req, res) => {
  try {
    const data = getdbPasienId(req.params.id)
    console.log(data);
    //4a. Jika Data Kosong
    if (!data || data.length === 0) {
      return res.status(HttpStatus.OK.code)
        .send(ResponseServer(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status, "tidak ada Data Pasien", null));
    }
    //4b. Jika Terdapat Isi Data
    const dataDelete = deldbPasienId(req.params.id)
    console.log(dataDelete);
    return res.status(HttpStatus.OK.code)
      .send(ResponseServer(HttpStatus.OK.code, HttpStatus.OK.status, "Delete Pasien succes", null));
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
      .send(ResponseServer(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred ${error.message}`));
  }
}
// 5. update Data Pasien by id
export const updatePatient = (req, res) => {
  const dataPasien = req.body;
  console.log(dataPasien);
  //Cek Request Body
  if (!dataPasien.nama || !dataPasien.alamat) {
    return res.status(HttpStatus.BAD_REQUEST.code)
      .send(ResponseServer(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, "Anda mengirimkan data yang salah", null));
  }
  try {
    const data = getdbPasienId(req.params.id)
    console.log(data);
    //5a. Jika Data Kosong
    if (!data || data.length === 0) {
      return res.status(HttpStatus.OK.code)
        .send(ResponseServer(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status, "tidak ada Data Pasien", null));
    }
    //5b. Jika Terdapat Isi Data
    const dataUpdate = updatedbPasien(req.params.id, dataPasien)
    console.log(dataUpdate);
    return res.status(HttpStatus.OK.code)
      .send(ResponseServer(HttpStatus.OK.code, HttpStatus.OK.status, "Update data Pasien succes", null));
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
      .send(ResponseServer(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred ${error.message}`));
  }
}

