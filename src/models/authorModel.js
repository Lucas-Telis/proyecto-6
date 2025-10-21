import mongoose from 'mongoose'
const { Schema } = mongoose

const AuthorSchema = new Schema(
  {
    name: { type: String, required: true },
    bio: String,
    birthdate: Date,
    genres: [String],
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
  },
  { timestamps: true }
)

export default mongoose.model('Author', AuthorSchema)
