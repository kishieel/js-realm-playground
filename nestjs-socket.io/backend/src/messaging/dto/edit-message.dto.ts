import { IsString, MaxLength } from 'class-validator';
import { MAX_CONTENT_LENGTH } from '../messaging.const';

export class EditMessageDto {
    @IsString()
    messageId: string;

    @IsString()
    @MaxLength(MAX_CONTENT_LENGTH)
    content: string;
}
