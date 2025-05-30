import { Router } from 'express'
import { UserController } from '../controllers/UserController'

const router = Router()
const controller = new UserController()

router.get('/', controller.getAll)
router.post('/block', controller.block)
router.post('/unblock', controller.unblock)
router.delete('/', controller.delete)

export default router
