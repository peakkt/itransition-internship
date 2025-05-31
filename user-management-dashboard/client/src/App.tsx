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
    const [filter, setFilter] = useState('')
    const [sort, setSort] = useState<'name' | 'email' | 'lastLogin'>('lastLogin')
    const [asc, setAsc] = useState(false)

    const loadUsers = () => {
        fetchWithAuth('/users')
            .then(res => (res.ok ? res.json() : Promise.reject()))
            .then((data: User[]) => setUsers(data))
            .catch(() => {
                AuthApi.clearToken()
                setLoggedIn(false)
            })
    }

    useEffect(() => {
        if (loggedIn) loadUsers()
    }, [loggedIn])

    if (!loggedIn) {
        return showRegister ? (
            <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
                <RegisterForm onSuccess={() => setShowRegister(false)} onBack={() => setShowRegister(false)} />
            </div>
        ) : (
            <LoginForm onLogin={() => setLoggedIn(true)} onShowRegister={() => setShowRegister(true)} />
        )
    }

    const toggleSort = (field: typeof sort) => {
        setSort(field)
        setAsc(prev => (field === sort ? !prev : true))
    }

    const filtered = users
        .filter(u =>
            u.name.toLowerCase().includes(filter.toLowerCase()) ||
            u.email.toLowerCase().includes(filter.toLowerCase())
        )
        .sort((a, b) => {
            const v1 = a[sort] ?? ''
            const v2 = b[sort] ?? ''
            return asc
                ? String(v1).localeCompare(String(v2))
                : String(v2).localeCompare(String(v1))
        })

    return (
        <div style={{ padding: '40px 56px', fontFamily: 'system-ui, sans-serif' }}>
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
                users={filtered}
                selected={selected}
                setSelected={setSelected}
                sort={sort}
                asc={asc}
                onSort={toggleSort}
            />
        </div>
    )
}

export default App
