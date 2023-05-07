//1. Model => User , //models/User.js
import mongoose from 'mongoose'

export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [{
    type: String,
    default: "Employee"
  }],
  aktif: {
    type: Boolean,
    default: true
  }
})

export const dbUserModel = mongoose.model('dbUser', userSchema)

// 1. get all User
export const getdbUserAll = () => {
  return dbUserModel.find()
}

// 2. create new User
export const createdbUser = (dataUser) => {
  const dbPasien = dbUserModel.create(dataUser)
  return dbPasien
}

// 3. get User by id
export const getdbUserName = (username) => {
  return dbUserModel.findOne(username)
}

// 3. get User by id
export const getdbUserId = (id) => {
  return dbUserModel.findById(id)
}

// 4. delete User by id
export const deldbUserId = (id) => {
  return dbUserModel.findByIdAndDelete(id)
}

// 5. update User
export const updatedbUser = (id, dataUser) => {
  const dbUser = dbUserModel.findByIdAndUpdate(id, dataUser, {
    new: true,
    runValidators: true,
  })
  return dbUser
}

// 6. find all aktif User
export const getdbUserAktif = () => {
  return dbUserModel.find({ "aktif": true })
}
