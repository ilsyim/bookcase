import { Router } from "express"
import * as booksCtrl from '../controllers/books.js'

const router = Router()

router.get('/', booksCtrl.index)

router.get('/:id', booksCtrl.show)

router.post('/', booksCtrl.create)

export {
  router
}