import { ArgValidator } from './util/ArgValidator';
import { ValidationError } from './util/ValidationError';

async function main() {
    try {
        const dice = ArgValidator.validate(process.argv.slice(2));
        console.log('Dice accepted', dice);
    } catch (err: unknown) {
        if (err instanceof ValidationError) {
            console.error(err.message);
            console.error('Example: node dist/index.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3');
            process.exit(1);
        }
        throw err;
    }
}

main().catch((err: unknown) => {
    console.error(err);
    process.exit(1);
});