export interface User {
    id: number
    name: string
    email: string
    lastLogin: string | null
    status: 'active' | 'blocked'
    createdAt: string
}
