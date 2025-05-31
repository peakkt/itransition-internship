import { useEffect, useState } from 'react'
import { UsersTable } from './components/UsersTable'
import { Toolbar } from './components/Toolbar'
import { LoginForm } from './components/LoginForm'
import { RegisterForm } from './components/RegisterForm'
import { AuthApi } from './services/AuthApi'
import { fetchWithAuth } from './services/fetchWithAuth'
import type { User } from './types/User'

function App() {
    const [users, setUsers] = useState<User[]>([])
    const [selected, setSelected] = useState<number[]>([])
    const [loggedIn, setLoggedIn] = useState<boolean>(!!AuthApi.getToken())
    const [showRegister, setShowRegister] = useState<boolean>(false)
    const [sortField, setSortField] = useState<'name' | 'email' | 'lastLogin'>('name')
    const [asc, setAsc] = useState<boolean>(true)
    const [filter, setFilter] = useState<string>('')

    const loadUsers = async () => {
        try {
            const res = await fetchWithAuth('/users')
            if (!res.ok) {
                return
            }
            const contentType = res.headers.get('Content-Type') || ''
            if (!contentType.includes('application/json')) {
                return
            }
            const data: User[] = await res.json()
            setUsers(data)
        } catch {
        }
    }

    useEffect(() => {
        if (loggedIn) {
            loadUsers()
        }
    }, [loggedIn])

    if (!loggedIn) {
        return showRegister ? (
            <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
                <RegisterForm
                    onSuccess={() => setShowRegister(false)}
                    onBack={() => setShowRegister(false)}
                />
            </div>
        ) : (
            <LoginForm
                onLogin={() => setLoggedIn(true)}
                onShowRegister={() => setShowRegister(true)}
            />
        )
    }

    const handleSort = (field: 'name' | 'email' | 'lastLogin') => {
        if (sortField === field) {
            setAsc(!asc)
        } else {
            setSortField(field)
            setAsc(true)
        }
    }

    const visibleUsers = users
        .filter(u => {
            const text = (u.name + ' ' + u.email).toLowerCase()
            return text.includes(filter.toLowerCase())
        })
        .sort((a, b) => {
            let va = ''
            let vb = ''
            if (sortField === 'name') {
                va = a.name.toLowerCase()
                vb = b.name.toLowerCase()
            }
            if (sortField === 'email') {
                va = a.email.toLowerCase()
                vb = b.email.toLowerCase()
            }
            if (sortField === 'lastLogin') {
                va = a.lastLogin || ''
                vb = b.lastLogin || ''
            }
            if (va < vb) return asc ? -1 : 1
            if (va > vb) return asc ? 1 : -1
            return 0
        })

    return (
        <div className="container py-4">
            <Toolbar
                selected={selected}
                onActionComplete={() => {
                    loadUsers()
                    setSelected([])
                }}
                filter={filter}
                setFilter={setFilter}
                onLogout={() => {
                    AuthApi.clearToken()
                    setLoggedIn(false)
                }}
            />

            <UsersTable
                users={visibleUsers}
                selected={selected}
                setSelected={setSelected}
                sort={sortField}
                asc={asc}
                onSort={handleSort}
            />
        </div>
    )
}

export default App