import { GameController } from './game/GameController'

async function main() {
    const controller = new GameController(process.argv.slice(2))
    await controller.start()
}

main().catch(err => {
    console.error(err)
    process.exit(1)
})
