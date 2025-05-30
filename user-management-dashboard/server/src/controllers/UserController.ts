import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
    private service = new UserService()

    getAll = async (_req: Request, res: Response) => {
        const users = await this.service.getAll()
        res.json(users)
    }

    block = async (req: Request, res: Response) => {
        const count = await this.service.block(req.body)
        res.json({ count })
    }

    unblock = async (req: Request, res: Response) => {
        const count = await this.service.unblock(req.body)
        res.json({ count })
    }

    delete = async (req: Request, res: Response) => {
        const count = await this.service.delete(req.body)
        res.json({ count })
    }
}
