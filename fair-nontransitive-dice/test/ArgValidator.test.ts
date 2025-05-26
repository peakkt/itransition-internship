import { ArgValidator } from '../src/util/ArgValidator'
import { ValidationError } from '../src/util/ValidationError'

describe('ArgValidator', () => {
    it('accepts three equal-length dice', () => {
        const r = ArgValidator.validate(['1,2', '3,4', '5,6'])
        expect(r).toHaveLength(3)
    })
    it('throws on unequal faces', () => {
        expect(() =>
            ArgValidator.validate(['1,2', '3,4,5', '6,7'])
        ).toThrow(ValidationError)
    })
})
