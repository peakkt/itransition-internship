import { Dice } from '../src/core/Dice'
import { ProbabilityCalculator } from '../src/stats/ProbabilityCalculator'

const a = new Dice([2, 2, 4, 4, 9, 9])
const b = new Dice([6, 8, 1, 1, 8, 6])

test('win probability matches sample (0.5556)', () => {
    const p = ProbabilityCalculator.winProbability(a, b)
    expect(p).toBeCloseTo(0.5556, 4)
})
