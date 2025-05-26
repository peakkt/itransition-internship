import { CommitReveal } from '../src/core/CommitReveal'

describe('CommitReveal', () => {
    it('produces correct modular result', () => {
        const range = 6
        const commit = new CommitReveal(range)
        const user = 3
        const { result } = commit.reveal(user)
        expect(result).toBe((commit.value + user) % range)
    })
})
