import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersHandler } from './users.handler';

@Module({
    controllers: [UsersHandler],
    providers: [UsersService],
})
export class UsersModule {}
