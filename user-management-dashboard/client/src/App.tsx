import { useEffect, useState } from 'react'
import { UsersTable } from './components/UsersTable'
import { Toolbar } from './components/Toolbar'
import { LoginForm } from './components/LoginForm'
import { RegisterForm } from './components/RegisterForm'
import { AuthApi } from './services/AuthApi'
import type { User } from './types/User'

function App() {
    const [users, setUsers] = useState<User[]>([])
    const [selected, setSelected] = useState<number[]>([])
    const [loggedIn, setLoggedIn] = useState<boolean>(!!AuthApi.getToken())
    const [showRegister, setShowRegister] = useState<boolean>(false)

    const loadUsers = () => {
        fetch('/users', {
            headers: {
                Authorization: `Bearer ${AuthApi.getToken()}`,
            },
        })
            .then(res => (res.ok ? res.json() : Promise.reject()))
            .then(setUsers)
            .catch(() => {
                AuthApi.clearToken()
                setLoggedIn(false)
            })
    }

    useEffect(() => {
        if (loggedIn) loadUsers()
    }, [loggedIn])

    if (!loggedIn) {
        return (
            <div className="container py-5 d-flex flex-column align-items-center">
                {showRegister ? (
                    <RegisterForm
                        onSuccess={() => setShowRegister(false)}
                        onBack={() => setShowRegister(false)}
                    />
                ) : (
                    <>
                        <LoginForm onLogin={() => setLoggedIn(true)} />
                        <button className="btn btn-link mt-3" onClick={() => setShowRegister(true)}>
                            Don't have an account? Register
                        </button>
                    </>
                )}
            </div>
        )
    }

    return (
        <div className="container py-4">
            <h2 className="mb-4">User Management</h2>
            <Toolbar
                selected={selected}
                onActionComplete={() => {
                    loadUsers()
                    setSelected([])
                }}
            />
            <UsersTable users={users} selected={selected} setSelected={setSelected} />
        </div>
    )
}

export default App
