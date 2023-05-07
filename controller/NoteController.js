import { HttpStatus, ResponseServer } from '../config/ResponData.js'
import { createdbNote, getdbNoteAll } from '../models/NoteModel.js';

const NamaDb = "Note"

export const getAllNotes = async (req, res) => {
  try {
    console.log("COBA");
    const data = await getdbNoteAll()
    console.log(data, typeof (data));
    if (!data || data.length === 0) {
      return res.status(HttpStatus.OK.code)
        .send(ResponseServer(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status, `Tidak Ditemukan Data : ${NamaDb}`, data));
    }

    return res.status(HttpStatus.OK.code)
      .send(ResponseServer(HttpStatus.OK.code, HttpStatus.OK.status, `Get all Data : ${NamaDb}`, data));
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
      .send(ResponseServer(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred ${error.message}`));
  }
}

export const createNewNote = async (req, res) => {
  const { user, title, text } = req.body
  // Confirm data
  if (!user || !title || !text) {
    return res.status(HttpStatus.BAD_REQUEST.code)
      .send(ResponseServer(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, "Anda mengirimkan data yang salah", null));
  }

  try {
    // // Check for duplicate username
    // const duplicate = await getdbUserName({ username })
    // console.log(duplicate);
    // if (duplicate) {
    //   return res.status(HttpStatus.DUPLICATED.code)
    //     .send(ResponseServer(HttpStatus.DUPLICATED.code, HttpStatus.DUPLICATED.status, "Duplicate username", null));
    // }
    const dataPasien = req.body;
    console.log(dataPasien);
    const data = await createdbNote(dataPasien)
    console.log(data, typeof (data), data.length);
    res.status(HttpStatus.CREATED.code)
      .send(ResponseServer(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'Data Pasien Created', null));
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
      .send(ResponseServer(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred ${error.message}`));
  }


}

export const updateNote = async (req, res) => {
  const { id, user, title, text, completed } = req.body
  console.log(req.body);
}

export const deleteNote = async (req, res) => {
  const { id } = req.params
  console.log(id);



}