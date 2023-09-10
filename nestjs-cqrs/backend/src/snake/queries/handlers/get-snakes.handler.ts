import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSnakesQuery } from '../triggers/get-snakes.query';
import { SnakesRepository } from '../../repositories/snakes.repository';

@QueryHandler(GetSnakesQuery)
export class GetSnakesHandler implements IQueryHandler<GetSnakesQuery> {
    constructor(private readonly repository: SnakesRepository) {}

    async execute(_: GetSnakesQuery) {
        return this.repository.findAll();
    }
}
