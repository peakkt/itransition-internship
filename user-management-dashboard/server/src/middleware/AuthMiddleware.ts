import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma'

export class AuthMiddleware {
    static authenticate(req: Request, res: Response, next: NextFunction) {
        if (req.method === 'GET') return next()

        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number }
            prisma.user.findUnique({ where: { id: payload.userId } }).then(user => {
                if (!user || user.status === 'blocked') {
                    return res.status(401).json({ message: 'Unauthorized' })
                }
                return next()
            }).catch(() => {
                return res.status(401).json({ message: 'Unauthorized' })
            })
        } catch {
            return res.status(401).json({ message: 'Unauthorized' })
        }
    }
}
