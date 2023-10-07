import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './enitites/document.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class DocumentsService {
    constructor(
        @InjectRepository(Document)
        private documentsRepository: Repository<Document>,
        private usersService: UsersService,
    ) {}

    async findAll(): Promise<Document[]> {
        return await this.documentsRepository.find();
    }

    async findOne(id: number): Promise<Document | null> {
        return await this.documentsRepository.findOneOrFail({
            where: { id },
            relations: ['createdBy', 'reviewers'],
        });
    }

    async create(dto: CreateDocumentDto) {
        const createdBy = await this.usersService.findOne(dto.createdById);
        const reviewers = await this.usersService.findMany(dto.reviewedByIds);
        const document = this.documentsRepository.create({
            title: dto.title,
            description: dto.description,
            category: dto.category,
            createdBy: createdBy,
            reviewers: reviewers,
        });
        return await this.documentsRepository.save(document);
    }

    async update(id: number, dto: UpdateDocumentDto) {
        const createdBy = dto.createdById
            ? await this.usersService.findOne(dto.createdById)
            : undefined;
        const reviewers = dto.reviewedByIds
            ? await this.usersService.findMany(dto.reviewedByIds)
            : undefined;
        const document = await this.findOne(id);
        return await this.documentsRepository.save({
            ...document,
            title: dto.title ?? document.title,
            description: dto.description ?? document.description,
            category: dto.category ?? document.category,
            createdBy: createdBy ?? document.createdBy,
            reviewers: reviewers ?? document.reviewers,
        });
    }

    async remove(id: number): Promise<void> {
        await this.documentsRepository.delete(id);
    }
}
