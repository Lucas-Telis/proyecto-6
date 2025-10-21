import express from 'express'
import cors from 'cors'
import authorRoutes from './routes/authorRoutes.js'
import bookRoutes from './routes/bookRoutes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/authors', authorRoutes)
app.use('/books', bookRoutes)

app.use((req, res) => res.status(404).json({ error: 'Not Found' }))
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({ error: err.message || 'Server error' })
})

export default app
