import { AuthApi } from './AuthApi'

export async function fetchWithAuth(input: RequestInfo, init: RequestInit = {}) {
    const token = AuthApi.getToken()
    const headers = {
        ...init.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
    return fetch(input, { ...init, headers })
}
