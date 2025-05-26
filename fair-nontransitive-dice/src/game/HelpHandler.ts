import { Dice } from '../core/Dice'
import { ProbabilityCalculator } from '../stats/ProbabilityCalculator'
import { TableRenderer } from '../stats/TableRenderer'

export class HelpHandler {
    print(dice: Dice[]) {
        const labels = dice.map(d => d.toString())
        const header = ['User ➡ Comp', ...labels]
        const rows = dice.map(user => this.buildRow(user, dice))
        const out = new TableRenderer().render(header, rows)
        console.log('Probability of the user’s win:')
        console.log(out)
    }

    private buildRow(user: Dice, all: Dice[]): string[] {
        const row = [user.toString()]
        for (const comp of all) {
            if (user === comp) row.push('-')
            else row.push(this.format(ProbabilityCalculator.winProbability(user, comp)))
        }
        return row
    }

    private format(n: number): string {
        return n.toFixed(4)
    }
}
