import mongoose from 'mongoose'
//const AutoIncrement = require('mongoose-sequence')(mongoose);
import AutoIncrementFactory from 'mongoose-sequence'
import { dbUserModel } from './UserModel.js';
const AutoIncrement = AutoIncrementFactory(mongoose);

export const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'dbUser'
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

// noteSchema.plugin(AutoIncrement, {
//   inc_field: 'ticket',
//   id: 'ticketNums',
//   start_seq: 500
// })

const dbNoteModel = mongoose.model('dbNote', noteSchema)

// 1. find all Data Pasien
export const getdbNoteAll = async () => {

  // Get all notes from MongoDB
  const notes = await dbNoteModel.find()

  // // If no notes 
  if (!notes?.length) {
    return notes
  }

  // // Add username to each note before sending the response 
  // // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
  // // You could also do this with a for...of loop
  const notesWithUser = await Promise.all(notes.map(async (note) => {
    const user = await dbUserModel.findById(note.user)
    return { ...note._doc, username: user.username }
  }))
  console.log(notesWithUser);

  return notesWithUser
}

// 2. add new Data Pasien
export const createdbNote = async (dataNote) => {
  // Create and store the new user 
  const dbNote = await dbNoteModel.create(dataNote)

  //const dbPasien = dbNoteModel.create({ ...dataNote, "aktif": true })
  return dbNote
}

// 3. get Data Pasien by id
export const getdbNoteId = (id) => {
  return dbNoteModel.findById(id)
}

// 4. delete Data Pasien by id
export const deldbNoteId = (id) => {
  return dbNoteModel.findByIdAndDelete(id)
}

// 5. update Data Pasien
export const updatedbNote = (id, dataNote) => {
  const dbNote = dbNoteModel.findByIdAndUpdate(id, dataNote, {
    new: true,
    runValidators: true,
  })
  return dbNote
}

