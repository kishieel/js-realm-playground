import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSnakesQuery } from '../triggers/get-snakes.query';
import { GetFruitsQuery } from '../triggers/get-fruits.query';
import { FruitsRepository } from '../../repositories/fruits.repository';

@QueryHandler(GetFruitsQuery)
export class GetFruitsHandler implements IQueryHandler<GetSnakesQuery> {
    constructor(private readonly repository: FruitsRepository) {}

    async execute(_: GetFruitsQuery) {
        return this.repository.findAll();
    }
}
