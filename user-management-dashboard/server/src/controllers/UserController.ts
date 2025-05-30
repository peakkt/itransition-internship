import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
    private service = new UserService()

    getAll = async (_req: Request, res: Response) => {
        try {
            const users = await this.service.getAll()
            res.json(users)
        } catch (err: any) {
            res.status(500).json({ message: err.message || 'Failed to load users' })
        }
    }

    block = async (req: Request, res: Response) => {
        try {
            const count = await this.service.block(req.body)
            res.json({ count })
        } catch (err: any) {
            res.status(400).json({ message: err.message || 'Failed to block users' })
        }
    }

    unblock = async (req: Request, res: Response) => {
        try {
            const count = await this.service.unblock(req.body)
            res.json({ count })
        } catch (err: any) {
            res.status(400).json({ message: err.message || 'Failed to unblock users' })
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const count = await this.service.delete(req.body)
            res.json({ count })
        } catch (err: any) {
            res.status(400).json({ message: err.message || 'Failed to delete users' })
        }
    }
}
