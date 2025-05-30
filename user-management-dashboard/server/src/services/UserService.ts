import { prisma } from '../lib/prisma'
import { User } from '@prisma/client'
import { ModifyUsersDto } from '../dto/user.dto'

export class UserService {
    async getAll(): Promise<User[]> {
        return prisma.user.findMany({ orderBy: { lastLogin: 'desc' } })
    }
    async block(data: ModifyUsersDto): Promise<number> {
        const result = await prisma.user.updateMany({ where: { id: { in: data.ids } }, data: { status: 'blocked' } })
        return result.count
    }
    async unblock(data: ModifyUsersDto): Promise<number> {
        const result = await prisma.user.updateMany({ where: { id: { in: data.ids } }, data: { status: 'active' } })
        return result.count
    }
    async delete(data: ModifyUsersDto): Promise<number> {
        const result = await prisma.user.deleteMany({ where: { id: { in: data.ids } } })
        return result.count
    }
}
