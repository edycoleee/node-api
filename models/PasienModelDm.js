//models/PasienModelDm.js
import { v4 as uuid } from 'uuid';

let dbPasiens = [
  {
    id: "1",
    nama: "Edy",
    alamat: "Karangawen",
    aktif: true
  }, {
    id: "2",
    nama: "Silmi",
    alamat: "Semarang",
    aktif: false
  }, {
    id: "3",
    nama: "Afin",
    alamat: "Semarang",
    aktif: true
  },
]
// 1. find all Data Pasien
export const getdbPasienAll = () => {
  return dbPasiens
}

// 7. find all Data Pasien Cari Alamat
export const getdbPasienAllCari = (cari) => {
  return dbPasiens.filter((dbPasien) => dbPasien.alamat.toUpperCase() === cari.toUpperCase())
}

// 2. get Data Pasien by id
export const getdbPasienId = (id) => {
  return dbPasiens.find((dbPasien) => dbPasien.id === id)
}
// 3. add new Data Pasien
export const createdbPasien = (dataPasien) => {
  const id = uuid()
  dbPasiens.push({ ...dataPasien, id, aktif: true });
  return id
}

// 4. delete Data Pasien by id
export const deldbPasienId = (id) => {
  dbPasiens = dbPasiens.filter((dbPasien) => dbPasien.id !== id)
  return dbPasiens
}

// 5. update Data Pasien
export const updatedbPasien = (id, dataPasien) => {
  dbPasiens = dbPasiens.map(dbPasien => {
    if (dbPasien.id == id) {
      dbPasien.nama = dataPasien.nama;
    }
    return dbPasien;
  })
  return dbPasiens
}

// 6. find all aktif Data Pasien
export const getdbPasienAktif = () => {
  return dbPasiens.filter((dbPasien) => dbPasien.aktif === true)
}

