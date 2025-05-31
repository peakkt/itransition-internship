import { AuthApi } from './AuthApi'

let isLoggingOut = false

export async function fetchWithAuth(input: RequestInfo, init?: RequestInit) {
    const token = AuthApi.getToken()
    const headers: Record<string, string> = {}

    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(input, {
        ...(init || {}),
        headers: {
            ...(init?.headers || {}),
            ...headers,
        },
    })

    if (response.status === 401) {
        if (!isLoggingOut) {
            isLoggingOut = true
            AuthApi.clearToken()
            window.location.href = '/login'
        }
        return response
    }

    return response
}