export async function fetchWithAuth(input: RequestInfo, init?: RequestInit) {
    const token = localStorage.getItem('token')
    const res = await fetch(input, {
        ...init,
        headers: {
            ...init?.headers,
            Authorization: `Bearer ${token}`,
        },
    })
    if (res.status === 401) {
        localStorage.removeItem('token')
    }
    return res
}
