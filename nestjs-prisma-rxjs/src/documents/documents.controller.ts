import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { UpdateDocumentDto } from './dtos/update-document.dto';
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) {
    }

    @Post()
    async createDocument(@Body() dto: CreateDocumentDto) {
        return await this.documentsService.createDocument(dto);
    }

    @Patch()
    async updateDocument(@Body() dto: UpdateDocumentDto) {
        return await this.documentsService.updateDocument(dto);
    }
}
