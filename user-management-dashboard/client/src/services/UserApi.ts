import { fetchWithAuth } from './fetchWithAuth'
import { AuthApi } from './AuthApi'

export class UserApi {
    private base = '/users'

    private async handleAuthFailure(res: Response) {
        if (res.status === 401) {
            AuthApi.clearToken()
            window.location.href = '/login'
            return true
        }
        return false
    }

    async getUsers() {
        const res = await fetchWithAuth(this.base)
        return res
    }

    async blockUsers(ids: number[]) {
        const res = await fetchWithAuth(this.base + '/block', {
            method: 'POST',
            body: JSON.stringify({ ids }),
        })
        if (await this.handleAuthFailure(res)) {
            return null
        }
        if (!res.ok) {
            throw new Error()
        }
        return res.json()
    }

    async unblockUsers(ids: number[]) {
        const res = await fetchWithAuth(this.base + '/unblock', {
            method: 'POST',
            body: JSON.stringify({ ids }),
        })
        if (await this.handleAuthFailure(res)) {
            return null
        }
        if (!res.ok) {
            throw new Error()
        }
        return res.json()
    }

    async deleteUsers(ids: number[]) {
        const res = await fetchWithAuth(this.base, {
            method: 'DELETE',
            body: JSON.stringify({ ids }),
        })
        if (await this.handleAuthFailure(res)) {
            return null
        }
        if (!res.ok) {
            throw new Error()
        }
        return res.json()
    }
}