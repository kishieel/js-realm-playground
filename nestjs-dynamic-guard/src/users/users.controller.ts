import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthSecretGuard } from 'src/utils/guards/auth-secret.guard';

@Controller('users')
@UseGuards(AuthSecretGuard)
export class UsersController {
    @Get()
    async getUsers() {
        return [{ id: 1, type: 'user' }];
    }
}
