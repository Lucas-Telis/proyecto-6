import { Router } from 'express'
import {
  getAll,
  getById,
  create,
  update,
  remove,
  toggleBook
} from '../controllers/authorController.js'
const router = Router()
router.get('/', getAll)
router.get('/:id', getById)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', remove)
router.put('/:id/add-book/:bookId', toggleBook)
export default router
