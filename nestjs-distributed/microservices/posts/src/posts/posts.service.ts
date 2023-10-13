import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@app/prisma/prisma.factory';
import { SlugAlreadyExistsError } from '@app/errors/slug-already-exists.error';

@Injectable()
export class PostsService {
    constructor(
        @Inject(PrismaService)
        private readonly prismaService: PrismaService,
    ) {}

    async getPostByUuid(uuid: string) {
        return this.prismaService.post.findUnique({ where: { uuid } });
    }

    async getManyPosts(where?: Prisma.PostWhereInput) {
        return this.prismaService.post.findMany({ where });
    }

    async createPost(data: Prisma.PostCreateInput) {
        const exists = await this.prismaService.post.exists({ slug: data.slug });
        if (exists) throw new SlugAlreadyExistsError('Slug already exists');
        return await this.prismaService.post.create({ data });
    }

    async updatePost(where: Prisma.PostWhereUniqueInput, data: Prisma.PostUpdateInput) {
        if (data.slug) {
            const post = await this.prismaService.post.findUnique({
                where: { slug: typeof data.slug === 'string' ? data.slug : data.slug.set },
            });
            if (!!post && post.uuid !== where.uuid) throw new SlugAlreadyExistsError('Slug already exists');
        }
        return await this.prismaService.post.update({ where, data });
    }

    async deletePost(where: Prisma.PostWhereUniqueInput) {
        return await this.prismaService.post.delete({ where });
    }
}
