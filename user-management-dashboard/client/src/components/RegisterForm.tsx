import { useState } from 'react'
import { AuthApi } from '../services/AuthApi'
import { Eye, EyeOff } from 'lucide-react'

export function RegisterForm({
                                 onSuccess,
                                 onBack,
                             }: {
    onSuccess: () => void
    onBack: () => void
}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await new AuthApi().register(name, email, password)
            onSuccess()
        } catch {
            setError('Registration failed')
        }
    }

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
            <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
                <div
                    style={{
                        paddingTop: '32px',
                        paddingLeft: '56px',
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: '34px',
                        fontWeight: 900,
                        letterSpacing: '0.08em',
                        color: '#006BFF',
                        textTransform: 'uppercase',
                        userSelect: 'none',
                    }}
                >
                    USER <span style={{ color: '#0044CC' }}>PΔNEL</span>
                </div>

                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '100%', maxWidth: 400, padding: '0 56px' }}>
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ fontSize: '14px', color: '#6c757d', marginBottom: '4px' }}>
                                Start managing users today
                            </div>
                            <div style={{ fontSize: '22px', fontWeight: 600, color: '#212529' }}>
                                Create your account
                            </div>
                        </div>

                        {error && <div className="alert alert-danger" style={{ marginBottom: '20px' }}>{error}</div>}

                        <form onSubmit={submit} autoComplete="on">
                            <div style={{ marginBottom: '14px', position: 'relative' }}>
                                <input
                                    type="text"
                                    name="name"
                                    autoComplete="name"
                                    placeholder="Name"
                                    style={{
                                        width: '100%',
                                        height: '48px',
                                        padding: '0 16px',
                                        paddingRight: '44px',
                                        borderRadius: '10px',
                                        border: '1px solid #CED4DA',
                                        fontSize: '16px',
                                    }}
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                />
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        right: '16px',
                                        transform: 'translateY(-50%)',
                                        color: '#6c757d',
                                        pointerEvents: 'none',
                                    }}
                                >
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z" stroke="#6c757d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            <div style={{ marginBottom: '14px', position: 'relative' }}>
                                <input
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="Email"
                                    style={{
                                        width: '100%',
                                        height: '48px',
                                        padding: '0 16px',
                                        paddingRight: '44px',
                                        borderRadius: '10px',
                                        border: '1px solid #CED4DA',
                                        fontSize: '16px',
                                    }}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        right: '16px',
                                        transform: 'translateY(-50%)',
                                        color: '#6c757d',
                                        pointerEvents: 'none',
                                    }}
                                >
                                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#6c757d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M22 6L12 13L2 6" stroke="#6c757d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            <div style={{ marginBottom: '20px', position: 'relative' }}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    autoComplete="new-password"
                                    placeholder="Password"
                                    style={{
                                        width: '100%',
                                        height: '48px',
                                        padding: '0 16px',
                                        paddingRight: '44px',
                                        borderRadius: '10px',
                                        border: '1px solid #CED4DA',
                                        fontSize: '16px',
                                    }}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                                {showPassword ? (
                                    <EyeOff
                                        size={18}
                                        onClick={() => setShowPassword(false)}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '16px',
                                            transform: 'translateY(-50%)',
                                            color: '#6c757d',
                                            cursor: 'pointer',
                                        }}
                                    />
                                ) : (
                                    <Eye
                                        size={18}
                                        onClick={() => setShowPassword(true)}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '16px',
                                            transform: 'translateY(-50%)',
                                            color: '#6c757d',
                                            cursor: 'pointer',
                                        }}
                                    />
                                )}
                            </div>

                            <button
                                type="submit"
                                style={{
                                    width: '100%',
                                    height: '48px',
                                    backgroundColor: '#006BFF',
                                    border: 'none',
                                    borderRadius: '10px',
                                    color: '#fff',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                }}
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>

                <div style={{ padding: '0 56px 36px 56px', fontSize: '14px', color: '#6c757d' }}>
                    Already have an account?{' '}
                    <button
                        onClick={onBack}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            color: '#006BFF',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                        }}
                    >
                        Sign in
                    </button>
                </div>
            </div>

            <div className="bg-login-right d-none d-md-block" style={{ width: '50%' }} />
        </div>
    )
}
