import { Dice } from '../core/Dice'

export class ProbabilityCalculator {
    static winProbability(user: Dice, computer: Dice): number {
        const u = user['faces']
        const c = computer['faces']
        let win = 0
        for (const uf of u) for (const cf of c) if (uf > cf) win++
        return win / (u.length * c.length)
    }
}
