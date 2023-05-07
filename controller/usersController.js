import { createdbUser, deldbUserId, getdbUserAll, getdbUserId, getdbUserName, updatedbUser } from "../models/UserModel.js";
import { HttpStatus, ResponseServer } from '../config/ResponData.js'
import bcrypt from "bcrypt"

// 1. get all User
export const getUsers = async (req, res) => {
  try {
    //1. Get all Data Pasien
    const data = await getdbUserAll()
    console.log(data, typeof (data));
    //1a. Jika Data Kosong
    if (!data || data.length === 0) {
      return res.status(HttpStatus.OK.code)
        .send(ResponseServer(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status, "tidak ada Data User", data));
    }
    //1b. Jika Terdapat Isi Data
    return res.status(HttpStatus.OK.code)
      .send(ResponseServer(HttpStatus.OK.code, HttpStatus.OK.status, "get all Data User", data));
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
      .send(ResponseServer(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred ${error.message}`));
  }
}

// 2. create new User
export const createUser = async (req, res) => {
  const { username, password, roles } = req.body
  console.log(username, password, roles);
  // Confirm data
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    console.log(!username, !password, !Array.isArray(roles), !roles.length);
    return res.status(HttpStatus.BAD_REQUEST.code)
      .send(ResponseServer(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, "Anda mengirimkan data yang salah", null));
  }

  try {

    // Check for duplicate username
    const duplicate = await getdbUserName({ username })
    console.log(duplicate);
    if (duplicate) {
      return res.status(HttpStatus.DUPLICATED.code)
        .send(ResponseServer(HttpStatus.DUPLICATED.code, HttpStatus.DUPLICATED.status, "Duplicate username", null));
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds
    const userObject = { username, "password": hashedPwd, roles }
    console.log("Object", userObject);

    const data = await createdbUser(userObject)
    console.log(data, typeof (data), data.length);
    res.status(HttpStatus.CREATED.code)
      .send(ResponseServer(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'Data Pasien Created', null));
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
      .send(ResponseServer(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred ${error.message}`));
  }
}

// 4. delete Data Pasien by id
export const deleteUser = async (req, res) => {
  try {
    //console.log(typeof (req.params.id));
    const data = await getdbUserId(req.params.id)
    //console.log(data);
    //4a. Jika Data Kosong
    if (!data || data.length === 0) {
      return res.status(HttpStatus.OK.code)
        .send(ResponseServer(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status, "tidak ada Data User", null));
    }
    //4b. Jika Terdapat Isi Data
    const dataDelete = await deldbUserId(req.params.id)
    console.log(dataDelete);
    return res.status(HttpStatus.OK.code)
      .send(ResponseServer(HttpStatus.OK.code, HttpStatus.OK.status, "Delete Pasien succes", null));
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
      .send(ResponseServer(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred ${error.message}`));
  }
}

// 5. update Data Pasien by id
export const updateUser = async (req, res) => {
  const { username, password, roles } = req.body
  console.log(username, password, roles);
  // Confirm data
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    console.log(!username, !password, !Array.isArray(roles), !roles.length);
    return res.status(HttpStatus.BAD_REQUEST.code)
      .send(ResponseServer(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, "Anda mengirimkan data yang salah", null));
  }

  try {
    const data = await getdbUserId(req.params.id)
    if (!data || data.length === 0) {
      return res.status(HttpStatus.OK.code)
        .send(ResponseServer(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status, "tidak ada Data Pasien", null));
    }

    const duplicate = await getdbUserName({ username })
    console.log(duplicate && duplicate?._id.toString() !== req.params.id);
    //if (duplicate && duplicate?._id.toString() !== req.params.id) {
    if (duplicate && duplicate?._id.toString() !== req.params.id) {
      return res.status(HttpStatus.DUPLICATED.code)
        .send(ResponseServer(HttpStatus.DUPLICATED.code, HttpStatus.DUPLICATED.status, "Duplicate username", null));
    }

    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds
    const dataPasien = {
      username,
      roles,
      password: hashedPwd,
      aktif: data.aktif
    }

    await updatedbUser(req.params.id, dataPasien)
    return res.status(HttpStatus.OK.code)
      .send(ResponseServer(HttpStatus.OK.code, HttpStatus.OK.status, "Update data User succes", null));

  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
      .send(ResponseServer(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred ${error.message}`));
  }

}

