import { UserApi } from '../services/UserApi'

const api = new UserApi()

export function Toolbar({
                            selected,
                            onActionComplete,
                        }: {
    selected: number[]
    onActionComplete: () => void
}) {
    const call = (action: 'block' | 'unblock' | 'delete') => {
        if (action === 'block') api.blockUsers(selected).then(onActionComplete)
        if (action === 'unblock') api.unblockUsers(selected).then(onActionComplete)
        if (action === 'delete') api.deleteUsers(selected).then(onActionComplete)
    }

    return (
        <div className="d-flex gap-2 mb-3">
            <button className="btn btn-warning" onClick={() => call('block')} disabled={!selected.length}>
                Block
            </button>
            <button className="btn btn-outline-secondary" onClick={() => call('unblock')} disabled={!selected.length}>
                🔓
            </button>
            <button className="btn btn-outline-danger" onClick={() => call('delete')} disabled={!selected.length}>
                🗑
            </button>
        </div>
    )
}
