import mongoose from 'mongoose'
import serverless from 'serverless-http'
import app from '../src/app.js'

const MONGODB_URI = process.env.MONGODB_URI
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false
      })
      .then((mongoose) => {
        console.log('✅ MongoDB conectado en Vercel')
        return mongoose
      })
      .catch((err) => {
        console.error('❌ Error de conexión MongoDB:', err.message)
        throw err
      })
  }
  cached.conn = await cached.promise
  return cached.conn
}

const handler = serverless(app)

export default async function main(req, res) {
  await connectDB()
  return handler(req, res)
}

export default async function handler(req, res) {
  await connectDB()
  const expressHandler = serverless(app)
  return expressHandler(req, res)
}
