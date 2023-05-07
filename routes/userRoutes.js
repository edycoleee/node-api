//routes/userRoutes.js
import express from "express";
import { createUser, deleteUser, getUsers, updateUser } from "../controller/usersController.js";
const userRouter = express.Router();


userRouter.route('/')
  // 1. find all Data Pasien
  .get(getUsers)
  // 2. add new Data Pasien
  .post(createUser);

// userRouter.route('/aktif')
//   // 6. find all aktif Data Pasien
//   .get(getPatientsAktif)

userRouter.route('/:id')
  //   // 2. get Data Pasien by id
  //   .get(getPatient)
  // 4. update Data Pasien by id
  .put(updateUser)
  //   // 5. remove Data Pasien by id
  .delete(deleteUser);


export default userRouter;