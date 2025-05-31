export function ForgotPassword({ onBack }: { onBack: () => void }) {
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

                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 56px',
                    }}
                >
                    <div style={{ maxWidth: 400, textAlign: 'center' }}>
                        <div style={{ fontSize: '14px', color: '#6c757d', marginBottom: '4px' }}>
                            Trouble signing in?
                        </div>
                        <div style={{ fontSize: '22px', fontWeight: 600, marginBottom: '24px', color: '#212529' }}>
                            Reset your access
                        </div>

                        <p style={{ fontSize: '15px', color: '#495057', marginBottom: '20px' }}>
                            If you've lost access to your account, send a request to our support team.
                            We'll help you recover it as soon as possible.
                        </p>

                        <div style={{ fontSize: '14px', color: '#6c757d', marginBottom: '24px' }}>
                            Write us at:
                            <br />
                            <strong style={{ color: '#212529' }}>help@userpanel.app</strong>
                        </div>

                        <button
                            onClick={onBack}
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                color: '#006BFF',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                fontSize: '14px',
                            }}
                        >
                            Back to sign in
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-login-right d-none d-md-block" style={{ width: '50%' }} />
        </div>
    )
}
