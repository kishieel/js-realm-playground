import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuditDto } from './dtos/create-audit.dto';

@Injectable()
export class AuditsService {
    private readonly logger = new Logger(AuditsService.name);

    constructor(private readonly prismaService: PrismaService) {}

    async createAudit(dto: CreateAuditDto) {
        this.logger.log('Creating audit...', JSON.stringify(dto));
        return await this.prismaService.documentAudit.create({
            data: {
                description: dto.description,
                document: { connect: { uuid: dto.documentUuid } },
            },
        });
    }
}
