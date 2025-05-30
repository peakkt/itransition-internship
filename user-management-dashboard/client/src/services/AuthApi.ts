export class AuthApi {
    private base = '/auth'

    async login(email: string, password: string) {
        const res = await fetch(this.base + '/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
        if (!res.ok) throw new Error('Login failed')
        const { token } = await res.json()
        localStorage.setItem('token', token)
        return token
    }

    async register(name: string, email: string, password: string) {
        const res = await fetch(this.base + '/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        })
        if (!res.ok) throw new Error('Registration failed')
    }

    static getToken() {
        return localStorage.getItem('token')
    }

    static clearToken() {
        localStorage.removeItem('token')
    }
}
