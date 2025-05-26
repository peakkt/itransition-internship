import { ValidationError } from './ValidationError';

export class ArgValidator {
    static validate(args: string[]): number[][] {
        this.ensureMinDice(args)
        const dice = args.map(this.toFaces)
        this.ensureUniformLength(dice)
        return dice
    }

    private static ensureMinDice(args: string[]) {
        if (args.length < 3) throw new ValidationError('At least three dice must be specified.')
    }

    private static toFaces(spec: string): number[] {
        if (!/^[0-9]+(,[0-9]+)*$/.test(spec)) throw new ValidationError(`Invalid dice format: ${spec}`)
        const faces = spec.split(',').map(Number)
        if (faces.some(isNaN)) throw new ValidationError(`Non-integer face detected in: ${spec}`)
        return faces
    }

    private static ensureUniformLength(dice: number[][]) {
        const len = dice[0].length
        if (dice.some(d => d.length !== len)) throw new ValidationError('All dice must have the same number of faces.')
    }
}
