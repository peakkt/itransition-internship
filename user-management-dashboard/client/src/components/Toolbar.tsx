import { UserApi } from '../services/UserApi'

const api = new UserApi()

export function Toolbar({
                            selected,
                            onActionComplete,
                            filter,
                            setFilter,
                            onLogout,
                        }: {
    selected: number[]
    onActionComplete: () => void
    filter: string
    setFilter: (v: string) => void
    onLogout: () => void
}) {
    const call = (action: 'block' | 'unblock' | 'delete') => {
        if (action === 'block') api.blockUsers(selected).then(onActionComplete)
        if (action === 'unblock') api.unblockUsers(selected).then(onActionComplete)
        if (action === 'delete') api.deleteUsers(selected).then(onActionComplete)
    }

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    backgroundColor: '#f1f3f5',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    flexWrap: 'wrap',
                    flexGrow: 1,
                }}
            >
                <div
                    style={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: '30px',
                        fontWeight: 900,
                        letterSpacing: '0.08em',
                        color: '#006BFF',
                        lineHeight: 1,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    USER
                    <span style={{ marginLeft: '4px', color: '#0044CC' }}>PΔNEL</span>
                </div>

                <input
                    type="text"
                    placeholder="Filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{
                        height: '40px',
                        width: '200px',
                        padding: '0 12px',
                        fontSize: '14px',
                        border: '1px solid #ced4da',
                        borderRadius: '6px',
                        outline: 'none',
                    }}
                />

                <button
                    onClick={() => call('block')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: '#007bff',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        height: '40px',
                        padding: '0 14px',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                    }}
                >
                    🔒 Block
                </button>

                <button
                    onClick={() => call('unblock')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: '#ffffff',
                        color: '#007bff',
                        border: '1px solid #007bff',
                        borderRadius: '6px',
                        height: '40px',
                        padding: '0 12px',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                >
                    🔓 Unlock
                </button>

                <button
                    onClick={() => call('delete')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: '#ffffff',
                        color: '#dc3545',
                        border: '1px solid #dc3545',
                        borderRadius: '6px',
                        height: '40px',
                        padding: '0 12px',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                >
                    🗑 Delete
                </button>
            </div>

            <button
                onClick={onLogout}
                style={{
                    marginLeft: '16px',
                    height: '40px',
                    padding: '0 16px',
                    backgroundColor: '#e9ecef',
                    color: '#212529',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#dee2e6')
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = '#e9ecef')
                }
            >
                Logout
            </button>
        </div>
    )
}
