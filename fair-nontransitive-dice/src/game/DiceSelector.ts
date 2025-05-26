import prompts from 'prompts'
import { randomInt } from 'crypto'
import { Dice } from '../core/Dice'
import { HelpHandler } from './HelpHandler'

type V = number | 'help' | 'exit'
type Side = 'user' | 'computer'

export class DiceSelector {
    constructor(private all: Dice[]) {}

    async select(first: Side) {
        return first === 'user' ? this.userFirst() : this.compFirst()
    }

    private async userFirst() {
        const you = await this.ask(this.all)
        const comp = this.auto(this.all.filter(d => d !== you))
        return { user: you, computer: comp }
    }

    private async compFirst() {
        const comp = this.auto(this.all)
        const you = await this.ask(this.all.filter(d => d !== comp))
        return { user: you, computer: comp }
    }

    private auto(list: Dice[]) {
        const d = list[randomInt(list.length)]
        console.log(`I choose the [${d}] dice.`)
        return d
    }

    private async ask(list: Dice[]): Promise<Dice> {
        const v = await this.menu(list)
        if (v === 'exit') process.exit(0)
        if (v === 'help') return this.helpThenRetry(list)
        console.log(`You choose the [${list[v]}] dice.`)
        return list[v]
    }

    private async helpThenRetry(list: Dice[]) {
        new HelpHandler().print(this.all)
        return this.ask(list)
    }

    private async menu(list: Dice[]) {
        const { pick }: { pick: V } = await prompts({
            type: 'select',
            name: 'pick',
            message: 'Choose your dice',
            choices: [
                ...list.map((d, i) => ({ title: `${i} - ${d}`, value: i })),
                { title: '? - help', value: 'help' },
                { title: 'X - exit', value: 'exit' }
            ]
        })
        return pick
    }
}
