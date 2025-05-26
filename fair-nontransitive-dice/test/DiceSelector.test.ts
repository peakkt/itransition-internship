import { Dice } from '../src/core/Dice'

jest.mock('prompts', () => {
    return () => Promise.resolve({ pick: 0 })
})

import { DiceSelector } from '../src/game/DiceSelector'

const dice = [new Dice([1]), new Dice([2]), new Dice([3])]

test('computer auto-picks remaining die', async () => {
    const ds = new DiceSelector(dice)
    const { user, computer } = await ds.select('computer')
    expect(dice).toContain(user)
    expect(dice).toContain(computer)
    expect(user).not.toBe(computer)
})
