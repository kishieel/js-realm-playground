import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SnakesRepository } from '../../repositories/snakes.repository';
import { UpdateGameCommand } from '../triggers/update-game.command';
import { Snake } from '../../models/snake.model';
import { FruitsRepository } from '../../repositories/fruits.repository';
import { Fruit } from '../../models/fruit.model';

@CommandHandler(UpdateGameCommand)
export class UpdateGameHandler implements ICommandHandler<UpdateGameCommand> {
    constructor(
        private readonly snakesRepository: SnakesRepository,
        private readonly fruitRepository: FruitsRepository,
        private readonly publisher: EventPublisher,
    ) {}

    async execute(_: UpdateGameCommand) {
        const [snakes, fruits] = await Promise.all([
            this.snakesRepository.findAll(),
            this.fruitRepository.findAll(),
        ]);
        await this.moveSnakes(snakes);
        await Promise.all([
            this.checkSnakesCollisions(snakes),
            this.checkEatenFruits(snakes, fruits),
        ]);
    }

    async moveSnakes(snakes: Snake[]) {
        await Promise.all(
            snakes.map(async (s) => {
                const snake = this.publisher.mergeObjectContext(s);
                snake.move();
                snake.commit();
            }),
        );
    }

    async checkSnakesCollisions(snakes: Snake[]) {
        [snakes];
    }

    async checkEatenFruits(snakes: Snake[], fruits: Fruit[]) {
        const isEater = (snake: Snake, fruit: Fruit) =>
            fruit.coords.x === snake.head.x && fruit.coords.y === snake.head.y;

        await Promise.all(
            fruits.map(async (fruit) => {
                const snake = snakes.find((snake) => isEater(snake, fruit));
                if (!snake) return;

                snake.tail.push(...snake.tail.slice(-1));
                fruit.eaten();
                fruit.commit();
            }),
        );
    }
}
