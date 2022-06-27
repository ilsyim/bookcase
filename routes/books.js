import { Router } from "express"
import * as booksCtrl from '../controllers/books.js'
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get('/', booksCtrl.index)

router.get('/:id', booksCtrl.show)

router.get('/:id/edit', isLoggedIn, booksCtrl.edit)

router.post('/', isLoggedIn, booksCtrl.create)

router.post('/:id/reviews', isLoggedIn, booksCtrl.createReview)

router.patch('/:id/flip-movie', isLoggedIn, booksCtrl.flipMovie)

router.put('/:id', isLoggedIn, booksCtrl.update)

router.delete('/:id/', isLoggedIn, booksCtrl.deleteBook)

router.delete('/:bookId/reviews/:reviewId', isLoggedIn, booksCtrl.deleteReview)

export {
  router
}