import { CommitReveal } from './CommitReveal'

export class FairGenerator {
    constructor(private range: number) {}
    initiate(): CommitReveal {
        return new CommitReveal(this.range)
    }
}
