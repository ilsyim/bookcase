import { Router } from 'express'
import * as apiCtrl from '../controllers/api.js'

const router = Router()

router.post('/search', apiCtrl.searchBook)

export {
  router
}