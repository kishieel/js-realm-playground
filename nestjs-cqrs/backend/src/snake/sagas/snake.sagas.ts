import { Injectable } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { mergeMap, Observable, of } from 'rxjs';
import { SnakeDiedEvent } from '../events/triggers/snake-died.event';
import { DeleteSnakeCommand } from '../commands/triggers/delete-snake.command';
import { DropSnakeFruitsCommand } from '../commands/triggers/drop-snake-fruits.command';

@Injectable()
export class SnakeSagas {
    @Saga()
    snakeDied = (event$: Observable<any>) => {
        return event$.pipe(
            ofType(SnakeDiedEvent),
            mergeMap((event) => {
                const { snakeId, loot } = event;
                return of(
                    new DropSnakeFruitsCommand(loot),
                    new DeleteSnakeCommand(snakeId),
                );
            }),
        );
    };
}
