import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { RegisterDto, LoginDto } from '../dto/auth.dto'
import { User } from '@prisma/client'

export class AuthService {
    async register(data: RegisterDto): Promise<User> {
        const hashed = await bcrypt.hash(data.password, Number(process.env.SALT_ROUNDS))
        return prisma.user.create({ data: { ...data, password: hashed } })
    }
    async login(data: LoginDto): Promise<{ token: string }> {
        const user = await prisma.user.findUnique({ where: { email: data.email } })
        if (!user || !(await bcrypt.compare(data.password, user.password))) throw new Error('Invalid credentials')
        return { token: this.generateToken(user) }
    }
    private generateToken(user: User) {
        return jwt.sign({ userId: user.id }, process.env.JWT_SECRET!)
    }
}
