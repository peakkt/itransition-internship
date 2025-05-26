export class Dice {
    private readonly faces: number[]
    constructor(values: number[]) {
        this.faces = [...values]
    }
    face(index: number): number {
        return this.faces[index]
    }
    size(): number {
        return this.faces.length
    }
    toString(): string {
        return this.faces.join(',')
    }
}
