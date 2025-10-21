import Book from '../models/bookModel.js'
import Author from '../models/authorModel.js'

export const getAll = async (req, res, next) => {
  try {
    res.json(await Book.find())
  } catch (err) {
    next(err)
  }
}

export const getById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate('author')
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.json(book)
  } catch (err) {
    next(err)
  }
}

export const create = async (req, res, next) => {
  try {
    const book = new Book(req.body)
    await book.save()
    if (book.author) {
      const author = await Author.findById(book.author)
      if (author && !author.books.some((b) => b.equals(book._id))) {
        author.books.push(book._id)
        await author.save()
      }
    }
    res.status(201).json(book)
  } catch (err) {
    next(err)
  }
}

export const update = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.json(book)
  } catch (err) {
    next(err)
  }
}

export const remove = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id)
    if (!book) return res.status(404).json({ error: 'Book not found' })
    if (book.author)
      await Author.findByIdAndUpdate(book.author, {
        $pull: { books: book._id }
      })
    res.json({ message: 'Book deleted' })
  } catch (err) {
    next(err)
  }
}
