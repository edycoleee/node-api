//models/PasienModelMysql.js
import dbPool from "../config/mysqlConfig.js"

// 1. find all Data Pasien
export const getdbPasienAll = () => {
  const SqlQuery = "SELECT * FROM patients"
  console.log("GET", dbPool.execute(SqlQuery));

  return
  return dbPool.execute(SqlQuery)
}
// 2. add new Data Pasien
export const createdbPasien = (dataPasien) => {
  const { nama, alamat } = dataPasien
  const SqlQuery = `INSERT INTO patients (nama, alamat) VALUES ('${nama}', '${alamat}')`
  return dbPool.execute(SqlQuery)
}

// 3. get Data Pasien by id
export const getdbPasienId = (id) => {
  const SqlQuery = `SELECT * FROM patients WHERE id = ${id}`
  return dbPool.execute(SqlQuery)
}

// 4. delete Data Pasien by id
export const deldbPasienId = (id) => {
  const SqlQuery = `DELETE FROM patients WHERE id = ${id}`
  return dbPool.execute(SqlQuery)
}

// 5. update Data Pasien
export const updatedbPasien = (id, dataPasien) => {
  const SqlQuery = "SELECT * FROM patients"
  return dbPool.execute(SqlQuery)
}

// 6. find all aktif Data Pasien
export const getdbPasienAktif = () => {
  const SqlQuery = `SELECT * FROM patients WHERE aktif = 1`
  return dbPool.execute(SqlQuery)
}

// 7. find all Data Pasien Cari Alamat
export const getdbPasienAllCari = (cari) => {
  const SqlQuery = `SELECT * FROM patients WHERE alamat = ${cari}`
  return dbPool.execute(SqlQuery)
}