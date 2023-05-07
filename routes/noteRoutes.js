import express from "express";
import { createNewNote, deleteNote, getAllNotes, updateNote } from "../controller/NoteController.js";
const noteRouter = express.Router();


noteRouter.route('/')
  // 1. find all Data Pasien
  .get(getAllNotes)
  // 2. add new Data Pasien
  .post(createNewNote);

// userRouter.route('/aktif')
//   // 6. find all aktif Data Pasien
//   .get(getPatientsAktif)

noteRouter.route('/:id')
  //   //   // 2. get Data Pasien by id
  //   //   .get(getPatient)
  // 4. update Data Pasien by id
  .put(updateNote)
  //   // 5. remove Data Pasien by id
  .delete(deleteNote);


export default noteRouter;