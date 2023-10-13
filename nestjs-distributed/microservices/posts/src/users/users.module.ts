import { Module } from '@nestjs/common';
import { UsersHandler } from './users.handler';
import { UsersService } from './users.service';

@Module({
    controllers: [UsersHandler],
    providers: [UsersService],
})
export class UsersModule {}
