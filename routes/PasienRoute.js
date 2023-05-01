//routes/PasienRoutes.js
import express from "express";
import {
  getPatients, createPatient,
  getPatient, updatePatient,
  getPatientsAktif, deletePatient
} from "../controller/PasienControllerMongo.js";
const PasienRouter = express.Router();


PasienRouter.route('/')
  // 1. find all Data Pasien
  .get(getPatients)
  // 2. add new Data Pasien
  .post(createPatient);

PasienRouter.route('/aktif')
  // 6. find all aktif Data Pasien
  .get(getPatientsAktif)

PasienRouter.route('/:id')
  // 2. get Data Pasien by id
  .get(getPatient)
  // 4. update Data Pasien by id
  .put(updatePatient)
  // 5. remove Data Pasien by id
  .delete(deletePatient);


export default PasienRouter;