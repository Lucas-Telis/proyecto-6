import mongoose from 'mongoose'
const { Schema } = mongoose

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    summary: String,
    publishedDate: Date,
    pages: Number,
    author: { type: Schema.Types.ObjectId, ref: 'Author' }
  },
  { timestamps: true }
)

export default mongoose.model('Book', BookSchema)
