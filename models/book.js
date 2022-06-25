import mongoose from "mongoose"

const Schema = mongoose.Schema

const bookSchema = new Schema ({
  name: String,
  read: Boolean,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true
})

const Book = mongoose.model("Book", bookSchema)

export {
  Book
}