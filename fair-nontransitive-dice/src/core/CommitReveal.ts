import { createHmac } from 'crypto'
import { CryptoRng } from './CryptoRng'

export class CommitReveal {
    key: Buffer
    value: number
    hmac: string
    constructor(private range: number) {
        this.key = CryptoRng.key()
        this.value = CryptoRng.uint(range)
        this.hmac = createHmac('sha3-256', this.key).update(String(this.value)).digest('hex')
    }
    reveal(user: number) {
        return {
            result: (this.value + user) % this.range,
            value: this.value,
            key: this.key.toString('hex')
        }
    }
}
