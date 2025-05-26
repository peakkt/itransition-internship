import { randomBytes, randomInt } from 'crypto';

export class CryptoRng {
    static key(bits = 256): Buffer {
        return randomBytes(bits / 8);
    }

    static uint(maxExclusive: number): number {
        return randomInt(0, maxExclusive);
    }
}
