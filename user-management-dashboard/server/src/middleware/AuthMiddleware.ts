import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma'

export class AuthMiddleware {
    static authenticate(req: Request, res: Response, next: NextFunction) {
        Promise.resolve()
            .then(() => req.headers.authorization?.split(' ')[1] || Promise.reject())
            .then(t => jwt.verify(t, process.env.JWT_SECRET!))
            .then((p: any) => prisma.user.findUnique({ where: { id: p.userId } }))
            .then(u => u && u.status !== 'blocked' ? next() : Promise.reject())
            .catch(() => res.redirect('/auth/login'))
    }
}
