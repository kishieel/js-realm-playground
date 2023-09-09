import { Module } from '@nestjs/common';
import { SnakeGateway } from './snake.gateway';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { SnakesRepository } from './repositories/snakes.repository';
import { FruitsRepository } from './repositories/fruits.repository';
import { SnakeEngine } from './snake.engine';
import { SnakeService } from './snake.service';

@Module({
    imports: [CqrsModule],
    providers: [
        SnakeEngine,
        SnakeService,
        SnakeGateway,
        SnakesRepository,
        FruitsRepository,
        ...CommandHandlers,
        ...EventHandlers,
    ],
})
export class SnakeModule {}
