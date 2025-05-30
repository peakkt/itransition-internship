import { Request, Response } from 'express'
import { AuthService } from '../services/AuthService'
import { RegisterDto, LoginDto } from '../dto/auth.dto'

export class AuthController {
    private service = new AuthService()

    register = async (req: Request, res: Response) => {
        try {
            const user = await this.service.register(req.body as RegisterDto)
            res.status(201).json(user)
        } catch (err: any) {
            res.status(400).json({ message: err.message || 'Registration failed' })
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const result = await this.service.login(req.body as LoginDto)
            res.json(result)
        } catch (err: any) {
            res.status(401).json({ message: err.message || 'Login failed' })
        }
    }
}
