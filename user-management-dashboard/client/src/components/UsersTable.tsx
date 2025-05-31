import type { User } from '../types/User'
import { useState } from 'react'

function timeAgo(dateStr?: string): string {
    if (!dateStr) return '-'
    const then = new Date(dateStr)
    const now = new Date()
    const diff = (now.getTime() - then.getTime()) / 1000
    if (diff < 60) return 'less than a minute ago'
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`
    if (diff < 2592000) return `${Math.floor(diff / 604800)} weeks ago`
    if (diff < 31536000) return `${Math.floor(diff / 2592000)} months ago`
    return `${Math.floor(diff / 31536000)} years ago`
}

export function UsersTable({
                               users,
                               selected,
                               setSelected,
                               sort,
                               asc,
                               onSort,
                           }: {
    users: User[]
    selected: number[]
    setSelected: (ids: number[]) => void
    sort: 'name' | 'email' | 'lastLogin'
    asc: boolean
    onSort: (field: 'name' | 'email' | 'lastLogin') => void
}) {
    const [hoveredId, setHoveredId] = useState<number | null>(null)

    const allSelected = users.length > 0 && selected.length === users.length
    const someSelected = selected.length > 0 && selected.length < users.length

    const toggle = (id: number) =>
        setSelected(
            selected.includes(id) ? selected.filter((i) => i !== id) : [...selected, id]
        )

    const toggleAll = () =>
        setSelected(allSelected ? [] : users.map((u) => u.id))

    const header = (
        label: string,
        key: 'name' | 'email' | 'lastLogin'
    ) => (
        <span
            onClick={() => onSort(key)}
            style={{
                cursor: 'pointer',
                userSelect: 'none',
                display: 'inline-flex',
                alignItems: 'center',
            }}
        >
      {label}
            {sort === key && (
                <span style={{ marginLeft: '4px', fontSize: '12px' }}>
          {asc ? '↑' : '↓'}
        </span>
            )}
    </span>
    )

    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '15px',
                }}
            >
                <thead
                    style={{
                        backgroundColor: '#f8f9fa',
                        borderBottom: '1px solid #dee2e6',
                    }}
                >
                <tr style={{ textAlign: 'left', color: '#495057' }}>
                    <th style={{ width: '40px', padding: '12px' }}>
                        <input
                            type="checkbox"
                            checked={allSelected}
                            ref={(el) => {
                                if (el) {
                                    el.indeterminate = someSelected
                                }
                            }}
                            onChange={toggleAll}
                            style={{ cursor: 'pointer', transform: 'scale(1.1)' }}
                        />
                    </th>
                    <th style={{ padding: '12px', width: '40%' }}>
                        {header('Name', 'name')}
                    </th>
                    <th style={{ padding: '12px', width: '30%' }}>
                        {header('Email', 'email')}
                    </th>
                    <th style={{ padding: '12px', width: '30%' }}>
                        {header('Last Login', 'lastLogin')}
                    </th>
                </tr>
                </thead>
                <tbody>
                {users.map((u) => {
                    const isBlocked = u.status === 'blocked'
                    const nameStyle = isBlocked
                        ? { textDecoration: 'line-through', color: '#adb5bd' }
                        : { color: '#212529' }
                    const cellColor = isBlocked ? '#adb5bd' : '#212529'
                    const exact = u.lastLogin
                        ? new Date(u.lastLogin).toLocaleString()
                        : ''

                    return (
                        <tr
                            key={u.id}
                            style={{
                                borderBottom: '1px solid #dee2e6',
                                backgroundColor: selected.includes(u.id)
                                    ? '#f0f8ff'
                                    : '#fff',
                            }}
                        >
                            <td style={{ padding: '12px' }}>
                                <input
                                    type="checkbox"
                                    checked={selected.includes(u.id)}
                                    onChange={() => toggle(u.id)}
                                    style={{ cursor: 'pointer', transform: 'scale(1.1)' }}
                                />
                            </td>
                            <td style={{ padding: '12px', ...nameStyle, fontWeight: 500 }}>
                                {u.name}
                            </td>
                            <td style={{ padding: '12px', color: cellColor }}>
                                {u.email}
                            </td>
                            <td
                                style={{
                                    padding: '12px',
                                    color: cellColor,
                                    position: 'relative',
                                }}
                                onMouseEnter={() => setHoveredId(u.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {timeAgo(u.lastLogin ?? undefined)}
                                {hoveredId === u.id && exact && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            bottom: '100%',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            marginBottom: '6px',
                                            background: 'rgba(0, 0, 0, 0.85)',
                                            color: '#fff',
                                            fontSize: '12px',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            whiteSpace: 'nowrap',
                                            zIndex: 10,
                                        }}
                                    >
                                        {exact}
                                    </div>
                                )}
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}
