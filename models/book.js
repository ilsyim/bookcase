import mongoose from "mongoose"

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  content: String,
  rating: {type: Number, min:1, max: 5, default: 3},
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true
})

const bookSchema = new Schema ({
  name: String,
  // read: Boolean,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  movieAdapt: {type: Boolean, default: false},
  reviews: [reviewSchema]
}, {
  timestamps: true
})

const Book = mongoose.model("Book", bookSchema)

export {
  Book
}