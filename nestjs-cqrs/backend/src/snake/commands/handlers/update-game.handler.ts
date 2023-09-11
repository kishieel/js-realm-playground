import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SnakesRepository } from '../../repositories/snakes.repository';
import { UpdateGameCommand } from '../triggers/update-game.command';
import { Snake } from '../../models/snake.model';
import { FruitsRepository } from '../../repositories/fruits.repository';
import { Fruit } from '../../models/fruit.model';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { range } from '../../../utils/functions/range';

@CommandHandler(UpdateGameCommand)
export class UpdateGameHandler implements ICommandHandler<UpdateGameCommand> {
    constructor(
        private readonly snakesRepository: SnakesRepository,
        private readonly fruitRepository: FruitsRepository,
        private readonly publisher: EventPublisher,
    ) {
    }

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
        const cellsTaken = snakes.reduce((acc, snake) => {
            snake.tail.forEach((tail) => {
                const uid = `${tail.x}:${tail.y}`;
                acc.set(uid, [...(acc.get(uid) || []), snake.id])
            })
            return acc;
        }, new Map<string, string[]>())


        const dying = snakes.filter((snake) => {
            const head = snake.tail[0];
            const uid = `${head.x}:${head.y}`;
            const snakesInSameCell = (cellsTaken.get(uid) || []).filter(id => id !== snake.id);
            return snakesInSameCell.length > 0;
        })

        dying.forEach((s) => {
            const snake = this.publisher.mergeObjectContext(s);
            snake.die()
            snake.commit()
        })
    }

    async checkEatenFruits(snakes: Snake[], fruits: Fruit[]) {
        const isEater = (snake: Snake, fruit: Fruit) =>
            fruit.coords.x === snake.head.x && fruit.coords.y === snake.head.y;

        await Promise.all(
            fruits
                .reduce((acc, fruit) => {
                    const snake = snakes.find((snake) => isEater(snake, fruit));
                    if (!!snake) acc.push({ snake, fruit });
                    return acc;
                }, <{ fruit: Fruit, snake: Snake }[]>[])
                .map(async ({ fruit, snake: s }) => {
                    const snake = this.publisher.mergeObjectContext(s);
                    snake.eat(fruit.id);
                    snake.commit()
                }),
        );
    }
}
