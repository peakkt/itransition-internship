import { AuthApi } from './AuthApi'

export async function fetchWithAuth(input: RequestInfo, init: RequestInit = {}) {
    const token = AuthApi.getToken()
    const headers = {
        ...init.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    }

    const res = await fetch(input, { ...init, headers })

    if (res.status === 401) {
        AuthApi.clearToken()
        location.reload()
    }

    return res
}
