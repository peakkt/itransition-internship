import prompts from 'prompts'
import { FairGenerator } from '../core/FairGenerator'

type V = 0 | 1 | 'help' | 'exit'

export class FirstMoveSelector {
    async decide(): Promise<'user' | 'computer'> {
        console.log("Let's determine who makes the first move.")
        const c = this.commit(), g = await this.ask()
        const r = c.reveal(g)
        return this.reveal(r, g)
    }

    private commit() {
        const c = new FairGenerator(2).initiate()
        console.log(`I selected a random value in the range 0..1 (HMAC=${c.hmac}).`)
        return c
    }

    private async ask(): Promise<0 | 1> {
        const v = await this.menu()
        if (v === 'exit') process.exit(0)
        if (v === 'help') return this.ask()
        return v
    }

    private async menu() {
        const { v }: { v: V } = await prompts({
            type: 'select',
            name: 'v',
            message: 'Try to guess my selection.',
            choices: [
                { title: '0', value: 0 },
                { title: '1', value: 1 },
                { title: 'X - exit', value: 'exit' },
                { title: '? - help', value: 'help' }
            ]
        })
        return v
    }

    private reveal(r: any, g: number): 'user' | 'computer' {
        console.log(`My selection: ${r.value} (KEY=${r.key}).`)
        const first: 'user' | 'computer' = r.value === g ? 'user' : 'computer'
        if (first === 'user') console.log('You make the first move.')
        return first
    }
}
