import { Body, Controller, Delete, Get, Param, Patch, Post, UseFilters } from '@nestjs/common';
import { EntityNotFoundFilter } from '../utils/filters/entity-not-found.filter';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Controller('documents')
@UseFilters(EntityNotFoundFilter)
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) {}

    @Post()
    create(@Body() dto: CreateDocumentDto) {
        return this.documentsService.create(dto);
    }

    @Get()
    findAll() {
        return this.documentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.documentsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateDocumentDto) {
        return this.documentsService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.documentsService.remove(+id);
    }
}
