import type { User } from '../types/User'

export function UsersTable({
                               users,
                               selected,
                               setSelected,
                           }: {
    users: User[]
    selected: number[]
    setSelected: (ids: number[]) => void
}) {
    const allSelected = users.length > 0 && selected.length === users.length

    const toggle = (id: number) =>
        setSelected(selected.includes(id) ? selected.filter(i => i !== id) : [...selected, id])

    const toggleAll = () =>
        setSelected(allSelected ? [] : users.map(u => u.id))

    return (
        <table className="table table-striped table-bordered">
            <thead>
            <tr>
                <th>
                    <input type="checkbox" checked={allSelected} onChange={toggleAll} />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Last Login</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {users.map(u => (
                <tr key={u.id}>
                    <td>
                        <input
                            type="checkbox"
                            checked={selected.includes(u.id)}
                            onChange={() => toggle(u.id)}
                        />
                    </td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.lastLogin ?? '-'}</td>
                    <td>{u.status}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}
