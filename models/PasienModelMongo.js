//models/postModelMongo.js
import mongoose from "mongoose";

const pasienSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: [true, "Data Pasien harus ada nama"],
  },
  alamat: {
    type: String,
    required: [true, "Data Pasien  harus ada alamat"],
  },
  aktif: {
    type: Boolean,
  },
})
const dbPasienModel = mongoose.model('dbPasien', pasienSchema)

// 1. find all Data Pasien
export const getdbPasienAll = () => {
  return dbPasienModel.find()
}

// 2. add new Data Pasien
export const createdbPasien = (dataPasien) => {
  const dbPasien = dbPasienModel.create({ ...dataPasien, "aktif": true })
  return dbPasien
}

// 3. get Data Pasien by id
export const getdbPasienId = (id) => {
  return dbPasienModel.findById(id)
}

// 4. delete Data Pasien by id
export const deldbPasienId = (id) => {
  return dbPasienModel.findByIdAndDelete(id)
}

// 5. update Data Pasien
export const updatedbPasien = (id, dataPasien) => {
  const dbPasien = dbPasienModel.findByIdAndUpdate(id, dataPasien, {
    new: true,
    runValidators: true,
  })
  return dbPasien
}

// 6. find all aktif Data Pasien
export const getdbPasienAktif = () => {
  return dbPasienModel.find({ "aktif": true })
}

// 7. find all Data Pasien Cari Alamat
export const getdbPasienAllCari = (cari) => {
  //db.stuff.find( { foo: /^bar$/i } );
  //return dbPasienModel.find({ "alamat": `/^${cari}$/i` })
  return dbPasienModel.find({ "alamat": cari })
}