export class UserApi {
    private base = '/users'

    async getUsers() {
        const res = await fetch(this.base)
        return res.json()
    }

    async blockUsers(ids: number[]) {
        const res = await fetch(this.base + '/block', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids }),
        })
        return res.json()
    }

    async unblockUsers(ids: number[]) {
        const res = await fetch(this.base + '/unblock', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids }),
        })
        return res.json()
    }

    async deleteUsers(ids: number[]) {
        const res = await fetch(this.base, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids }),
        })
        return res.json()
    }
}
