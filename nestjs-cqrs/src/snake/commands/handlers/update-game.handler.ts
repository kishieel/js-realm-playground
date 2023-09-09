import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SnakesRepository } from '../../repositories/snakes.repository';
import { UpdateGameCommand } from '../triggers/update-game.command';

@CommandHandler(UpdateGameCommand)
export class UpdateGameHandler implements ICommandHandler<UpdateGameCommand> {
    constructor(
        private readonly snakesRepository: SnakesRepository,
        private readonly publisher: EventPublisher,
    ) {}

    async execute(_: UpdateGameCommand) {
        const snakes = await this.snakesRepository.findAll();
        await Promise.all(
            snakes.map(async (s) => {
                const snake = this.publisher.mergeObjectContext(s);
                snake.move();
                snake.commit();
            }),
        );
    }
}
