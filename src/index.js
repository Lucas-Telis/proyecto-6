import dotenv from 'dotenv'
import mongoose from 'mongoose'
import app from './app.js'

dotenv.config()
const PORT = process.env.PORT || 4001
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/proyecto-6'

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB:', MONGODB_URI)
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err)
    process.exit(1)
  })
