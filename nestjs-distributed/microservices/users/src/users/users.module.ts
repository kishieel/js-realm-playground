import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersHandler } from '@app/users/users.handler';
import { UsersService } from '@app/users/users.service';

@Module({
    controllers: [UsersController, UsersHandler],
    providers: [UsersService],
})
export class UsersModule {}
