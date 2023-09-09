import { AggregateRoot } from '@nestjs/cqrs';

export class Fruit extends AggregateRoot {
    constructor(private readonly id: string) {
        super();
    }
}
