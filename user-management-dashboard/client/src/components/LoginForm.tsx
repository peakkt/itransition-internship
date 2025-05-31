import { useState } from 'react'
import { AuthApi } from '../services/AuthApi'
import { Eye, EyeOff } from 'lucide-react'
import { ForgotPassword } from './ForgotPassword'

export function LoginForm({
                              onLogin,
                              onShowRegister,
                          }: {
    onLogin: () => void
    onShowRegister: () => void
}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showForgot, setShowForgot] = useState(false)

    if (showForgot) return <ForgotPassword onBack={() => setShowForgot(false)} />

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await new AuthApi().login(email, password)
            onLogin()
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Login failed')
            }
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
                                Manage users with confidence
                            </div>
                            <div style={{ fontSize: '22px', fontWeight: 600, color: '#212529' }}>
                                Sign in to User Panel
                            </div>
                        </div>

                        {error && <div className="alert alert-danger" style={{ marginBottom: '20px' }}>{error}</div>}

                        <form onSubmit={submit} autoComplete="on">
                            <input
                                type="text"
                                name="username"
                                autoComplete="username"
                                style={{ position: 'absolute', height: 0, opacity: 0, pointerEvents: 'none' }}
                            />

                            <div style={{ marginBottom: '14px', position: 'relative' }}>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="Email"
                                    style={{
                                        width: '100%',
                                        height: '48px',
                                        padding: '0 48px 0 16px',
                                        borderRadius: '10px',
                                        border: '1px solid #CED4DA',
                                        fontSize: '16px',
                                    }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <svg
                                    width="20"
                                    height="20"
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

                            <div style={{ marginBottom: '14px', position: 'relative' }}>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    style={{
                                        width: '100%',
                                        height: '48px',
                                        padding: '0 48px 0 16px',
                                        borderRadius: '10px',
                                        border: '1px solid #CED4DA',
                                        fontSize: '16px',
                                    }}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                {showPassword ? (
                                    <EyeOff
                                        size={20}
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
                                        size={20}
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

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#6c757d', marginBottom: '20px' }}>
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                    style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                                />
                                <label htmlFor="remember" style={{ cursor: 'pointer' }}>
                                    Remember me
                                </label>
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
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>

                <div style={{ padding: '0 56px 36px 56px', display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#6c757d' }}>
                    <div>
                        Don’t have an account?{' '}
                        <button
                            onClick={onShowRegister}
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                color: '#006BFF',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                            }}
                        >
                            Create one
                        </button>
                    </div>
                    <button
                        onClick={() => setShowForgot(true)}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            color: '#006BFF',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                        }}
                    >
                        Forgot password?
                    </button>
                </div>
            </div>

            <div className="bg-login-right d-none d-md-block" style={{ width: '50%' }} />
        </div>
    )
}
