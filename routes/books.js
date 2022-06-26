import { Router } from "express"
import * as booksCtrl from '../controllers/books.js'
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get('/', booksCtrl.index)

router.get('/:id', booksCtrl.show)

router.get('/:id/edit', isLoggedIn, booksCtrl.edit)

router.post('/', isLoggedIn, booksCtrl.create)

router.patch('/:id/flip-movie', isLoggedIn, booksCtrl.flipMovie)

export {
  router
}