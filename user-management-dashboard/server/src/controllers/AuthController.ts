import { Request, Response } from 'express'
import { AuthService } from '../services/AuthService'
import { RegisterDto, LoginDto } from '../dto/auth.dto'

export class AuthController {
    private service = new AuthService()

    register = async (req: Request, res: Response) => {
        const user = await this.service.register(req.body as RegisterDto)
        res.status(201).json(user)
    }

    login = async (req: Request, res: Response) => {
        const result = await this.service.login(req.body as LoginDto)
        res.json(result)
    }
}
