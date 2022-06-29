import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema ({
  name: String,
  authors: String,
  pageCount: Number,
  image: String
})

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  books: [bookSchema]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
