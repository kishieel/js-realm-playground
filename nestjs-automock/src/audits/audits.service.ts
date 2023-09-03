import { Injectable, Logger } from '@nestjs/common';
import { AddEntryDto } from './dto/create-entry.dto';

@Injectable()
export class AuditsService {
    private readonly logger = new Logger(AuditsService.name);

    addEntry(addEntryDto: AddEntryDto) {
        this.logger.log('I am just a stub function', { args: addEntryDto });
    }
}
