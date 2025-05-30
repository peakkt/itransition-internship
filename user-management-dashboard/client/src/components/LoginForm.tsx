import { useState } from 'react'
import { AuthApi } from '../services/AuthApi'

export function LoginForm({ onLogin }: { onLogin: () => void }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await new AuthApi().login(email, password)
            onLogin()
        } catch {
            setError('Invalid credentials or blocked user')
        }
    }

    return (
        <form onSubmit={submit} className="w-100" style={{ maxWidth: 360 }}>
            <h4 className="mb-3">Login</h4>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
                <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            </div>
            <div className="mb-3">
                <input className="form-control" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            </div>
            <button className="btn btn-primary w-100" type="submit">Login</button>
        </form>
    )
}
