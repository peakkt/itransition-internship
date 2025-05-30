import { useState, useEffect } from 'react'
import { UsersTable } from './components/UsersTable'
import { Toolbar } from './components/Toolbar'
import { UserApi } from './services/UserApi'
import type { User } from './types/User'

const api = new UserApi()

function App() {
    const [users, setUsers] = useState<User[]>([])
    const [selected, setSelected] = useState<number[]>([])

    const loadUsers = () => api.getUsers().then(setUsers)

    useEffect(() => {
        loadUsers()
    }, [])

    return (
        <div className="container py-4">
            <h2 className="mb-4">User Management</h2>
            <Toolbar selected={selected} onActionComplete={() => {
                loadUsers()
                setSelected([])
            }} />
            <UsersTable users={users} selected={selected} setSelected={setSelected} />
        </div>
    )
}

export default App
