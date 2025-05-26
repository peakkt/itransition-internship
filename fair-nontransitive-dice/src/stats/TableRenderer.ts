import Table from 'cli-table3'

export class TableRenderer {
    render(headers: string[], rows: string[][]): string {
        const table = new Table({ head: headers, style: { head: [], border: [] } })
        rows.forEach(r => table.push(r))
        return table.toString()
    }
}
