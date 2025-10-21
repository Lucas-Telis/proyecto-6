import Author from '../models/authorModel.js'
import Book from '../models/bookModel.js'

export const getAll = async (req, res, next) => {
  try {
    res.json(await Author.find())
  } catch (err) {
    next(err)
  }
}

export const getById = async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id).populate('books')
    if (!author) return res.status(404).json({ error: 'Author not found' })
    res.json(author)
  } catch (err) {
    next(err)
  }
}

export const create = async (req, res, next) => {
  try {
    const author = new Author(req.body)
    await author.save()
    res.status(201).json(author)
  } catch (err) {
    next(err)
  }
}

export const update = async (req, res, next) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!author) return res.status(404).json({ error: 'Author not found' })
    res.json(author)
  } catch (err) {
    next(err)
  }
}

export const remove = async (req, res, next) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id)
    if (!author) return res.status(404).json({ error: 'Author not found' })
    await Book.updateMany({ author: author._id }, { $unset: { author: '' } })
    res.json({ message: 'Author deleted' })
  } catch (err) {
    next(err)
  }
}

export const toggleBook = async (req, res, next) => {
  try {
    const { id, bookId } = req.params
    const author = await Author.findById(id)
    if (!author) return res.status(404).json({ error: 'Author not found' })
    const book = await Book.findById(bookId)
    if (!book) return res.status(404).json({ error: 'Book not found' })

    const exists = author.books.some((b) => b.equals(book._id))
    if (exists) {
      author.books = author.books.filter((b) => !b.equals(book._id))
      if (book.author && book.author.equals(author._id)) {
        book.author = undefined
        await book.save()
      }
    } else {
      author.books.push(book._id)
      book.author = author._id
      await book.save()
    }
    await author.save()
    res.json(await Author.findById(id).populate('books'))
  } catch (err) {
    next(err)
  }
}
