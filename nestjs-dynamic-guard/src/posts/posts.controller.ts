import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthSecretGuard } from 'src/utils/guards/auth-secret.guard';

@Controller('posts')
@UseGuards(AuthSecretGuard)
export class PostsController {
    @Get()
    async getPosts() {
        return [{ id: 1, type: 'post' }];
    }
}
