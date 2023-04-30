//routes/PasienRoutes.js
import express from "express";
const PasienRouter = express.Router();
import {
  getPatients, getPatientsAktif,
  createPatient, getPatient,
  deletePatient, updatePatient
} from '../controller/PasienController.js';

PasienRouter.route('/')
  // 1,7. find all Data Pasien which alamat contains ’semarang’
  .get(getPatients)
  // 3. add new Data Pasien
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