import { useState } from 'react'
import { AuthApi } from '../services/AuthApi'

export function RegisterForm({ onSuccess, onBack }: { onSuccess: () => void; onBack: () => void }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await new AuthApi().register(name, email, password)
            onSuccess()
        } catch {
            setError('Registration failed. Email may already be in use.')
        }
    }

    return (
        <form onSubmit={submit} className="w-100" style={{ maxWidth: 360 }}>
            <h4 className="mb-3">Register</h4>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-2">
                <input className="form-control" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
            </div>
            <div className="mb-2">
                <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            </div>
            <div className="mb-3">
                <input className="form-control" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            </div>
            <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary w-50" type="button" onClick={onBack}>Back</button>
                <button className="btn btn-success w-50" type="submit">Register</button>
            </div>
        </form>
    )
}
