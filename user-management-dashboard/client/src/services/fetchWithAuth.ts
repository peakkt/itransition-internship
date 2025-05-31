import { AuthApi } from './AuthApi'

export async function fetchWithAuth(input: RequestInfo, init: RequestInit = {}) {
    const token = AuthApi.getToken()
    const headers: Record<string, string> = {}
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }
    if (init.body) {
        headers['Content-Type'] = 'application/json'
    }
    const response = await fetch(input, {
        ...init,
        headers: {
            ...(init.headers || {}),
            ...headers,
        },
    })
    return response
}