import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth, AuthCtx, AuthGuard, HasAllPermissions, Permission } from '@kishieel/nestjs-distributed-shared';
import { CreatePostDto } from '@app/posts/dtos/create-post.dto';
import { PostsService } from '@app/posts/posts.service';
import { UpdatePostDto } from '@app/posts/dtos/update-post.dto';

@Controller()
@ApiTags('Posts API')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get(':uuid')
    @UseGuards(AuthGuard, HasAllPermissions([Permission.PostRead]))
    @ApiBearerAuth()
    getPost(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
        return this.postsService.getPostByUuid(uuid);
    }

    @Get()
    @UseGuards(AuthGuard, HasAllPermissions([Permission.PostRead]))
    @ApiBearerAuth()
    getPosts() {
        return this.postsService.getManyPosts();
    }

    @Post()
    @UseGuards(AuthGuard, HasAllPermissions([Permission.PostWrite]))
    @ApiBearerAuth()
    createPost(@AuthCtx() auth: Auth, @Body() dto: CreatePostDto) {
        return this.postsService.createPost({
            slug: dto.slug,
            title: dto.title,
            body: dto.body,
            createdBy: { connect: { uuid: auth.user.uuid } },
        });
    }

    @Patch(':uuid')
    @UseGuards(AuthGuard, HasAllPermissions([Permission.PostWrite]))
    @ApiBearerAuth()
    updateUser(@Param('uuid', new ParseUUIDPipe()) uuid: string, @Body() dto: UpdatePostDto) {
        return this.postsService.updatePost(
            { uuid },
            {
                slug: dto.slug,
                title: dto.title,
                body: dto.body,
            },
        );
    }

    @Delete(':uuid')
    @UseGuards(AuthGuard, HasAllPermissions([Permission.PostWrite]))
    @ApiBearerAuth()
    deleteUser(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
        return this.postsService.deletePost({ uuid });
    }
}
