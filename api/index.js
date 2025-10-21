import serverless from 'serverless-http'
import mongoose from 'mongoose'
import app from '../src/app.js'

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/proyecto-6'
let connPromise = null
async function connectOnce() {
  if (connPromise) return connPromise
  connPromise = mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  return connPromise
}

export default async function handler(req, res) {
  try {
    await connectOnce()
    return serverless(app)(req, res)
  } catch (err) {
    console.error('DB connection error', err)
    res.status(500).json({ error: 'DB connection error' })
  }
}
