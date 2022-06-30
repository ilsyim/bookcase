import mongoose from 'mongoose'

// const bookSchema = new mongoose.Schema ({
//   name: String,
//   authors: String,
//   pageCount: Number,
//   image: String
// })

const Schema = mongoose.Schema

const listSchema = new Schema({
  name: String
}, {
  timestamps: true
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  list: [listSchema]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
