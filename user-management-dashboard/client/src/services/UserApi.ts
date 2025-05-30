import { fetchWithAuth } from './fetchWithAuth'

export class UserApi {
    private base = '/users'

    async getUsers() {
        const res = await fetchWithAuth(this.base)
        return res.json()
    }

    async blockUsers(ids: number[]) {
        const res = await fetchWithAuth(this.base + '/block', {
            method: 'POST',
            body: JSON.stringify({ ids }),
        })
        return res.json()
    }

    async unblockUsers(ids: number[]) {
        const res = await fetchWithAuth(this.base + '/unblock', {
            method: 'POST',
            body: JSON.stringify({ ids }),
        })
        return res.json()
    }

    async deleteUsers(ids: number[]) {
        const res = await fetchWithAuth(this.base, {
            method: 'DELETE',
            body: JSON.stringify({ ids }),
        })
        return res.json()
    }
}
