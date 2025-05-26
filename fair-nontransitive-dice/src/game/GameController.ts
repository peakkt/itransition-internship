import { ArgValidator } from '../util/ArgValidator'
import { ValidationError } from '../util/ValidationError'
import { Dice } from '../core/Dice'
import { FirstMoveSelector } from './FirstMoveSelector'
import { DiceSelector } from './DiceSelector'
import { FairGenerator } from '../core/FairGenerator'
import { HelpHandler } from './HelpHandler'
import prompts from 'prompts'

export class GameController {
    constructor(private args: string[]) {}

    async start() {
        const dice = this.safeParse()
        const first = await new FirstMoveSelector().decide()
        const selector = new DiceSelector(dice)
        const picks = await selector.select(first)
        await this.play(picks)
    }

    private async play(p: { user: Dice; computer: Dice }) {
        const c = await this.roll(p.computer, 'Computer')
        const u = await this.roll(p.user, 'User')
        this.showResult(u, c)
    }

    private safeParse(): Dice[] {
        try {
            return this.parseDice()
        } catch (err: unknown) {
            if (err instanceof ValidationError) this.exitWithError(err.message)
            throw err
        }
    }

    private parseDice(): Dice[] {
        return ArgValidator.validate(this.args).map(f => new Dice(f))
    }

    private exitWithError(msg: string) {
        console.error(msg)
        console.error('Example: node dist/index.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3')
        process.exit(1)
    }

    private async roll(dice: Dice, who: string): Promise<number> {
        const commit = new FairGenerator(dice.size()).initiate()
        this.showCommit(commit, dice.size(), who === 'Computer')
        const choice = await this.askInput(dice.size())
        return this.reveal(commit, choice, dice, who === 'Computer')
    }

    private showCommit(commit: any, faces: number, isComputer: boolean) {
        console.log(isComputer ? "It's time for my roll." : "It's time for your roll.")
        console.log(`I selected a random value in the range 0..${faces - 1} (HMAC=${commit.hmac}).`)
    }

    private async askInput(size: number): Promise<number> {
        const choices = this.buildChoices(size)
        const { input }: { input: number | 'help' | 'exit' } = await prompts({
            type: 'select',
            name: 'input',
            message: `Add your number modulo ${size}.`,
            choices
        })
        return this.handleInput(input, size)
    }

    private buildChoices(size: number) {
        const digits = Array.from({ length: size }, (_, i) => ({ title: `${i}`, value: i }))
        return [...digits, { title: '? - help', value: 'help' }, { title: 'X - exit', value: 'exit' }]
    }

    private async handleInput(input: any, size: number): Promise<number> {
        if (input === 'exit') process.exit(0)
        if (input === 'help') return this.showHelp(size)
        return input
    }

    private async showHelp(size: number): Promise<number> {
        new HelpHandler().print(this.safeParse())
        return this.askInput(size)
    }

    private reveal(commit: any, input: number, dice: Dice, isComputer: boolean): number {
        const r = commit.reveal(input)
        console.log(`My number is ${r.value} (KEY=${r.key})`)
        console.log(`The fair number generation result is ${r.value} + ${input} = ${r.result} (mod ${dice.size()})`)
        const face = dice.face(r.result)
        if (isComputer) console.log(`My roll result is ${face}.`)
        else console.log(`Your roll result is ${face}.`)
        return face
    }

    private showResult(userRoll: number, computerRoll: number): void {
        console.log(`Computer rolled: ${computerRoll}`)
        if (userRoll > computerRoll) console.log('You win!')
        else if (userRoll < computerRoll) console.log('Computer wins!')
        else console.log('Draw!')
    }
}
