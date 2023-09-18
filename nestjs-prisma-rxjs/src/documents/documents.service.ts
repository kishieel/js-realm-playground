import { Injectable, Logger } from '@nestjs/common';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { UpdateDocumentDto } from './dtos/update-document.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DocumentsService {
    private readonly logger = new Logger(DocumentsService.name);

    constructor(private readonly prismaService: PrismaService) {}

    async createDocument(dto: CreateDocumentDto) {
        this.logger.log('Creating document...', JSON.stringify(dto));
        return await this.prismaService.document.create({
            data: {
                name: dto.name,
                tags: {
                    createMany: { data: dto.tags.map((tag) => ({ tag })) },
                },
                comments: {
                    createMany: { data: dto.comments.map((comment) => ({ comment })) },
                },
            },
        });
    }

    async updateDocument(dto: UpdateDocumentDto) {
        this.logger.log('Updating document...', JSON.stringify(dto));
        return await this.prismaService.document.update({
            where: {
                uuid: dto.uuid,
            },
            data: {
                name: dto.name,
                tags: {
                    createMany: { data: dto.tags.map((tag) => ({ tag })) },
                },
                comments: {
                    createMany: { data: dto.comments.map((comment) => ({ comment })) },
                },
            },
        });
    }
}
