import serverless from 'serverless-http'
import mongoose from 'mongoose'
import app from '../src/app.js'

let isConnected = false

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://lucas1234@cluster0.l04pdv2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

async function connectDB() {
  if (isConnected) return
  try {
    const db = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false
    })
    isConnected = db.connections[0].readyState
    console.log('✅ MongoDB connected on Vercel')
  } catch (err) {
    console.error('❌ MongoDB connection error:', err)
  }
}

export default async function handler(req, res) {
  await connectDB()
  const expressHandler = serverless(app)
  return expressHandler(req, res)
}
