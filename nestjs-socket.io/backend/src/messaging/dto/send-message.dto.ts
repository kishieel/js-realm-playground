import { IsOptional, IsString, MaxLength } from 'class-validator';
import { MAX_CONTENT_LENGTH } from '../messaging.const';

export class SendMessageDto {
    @IsString()
    @MaxLength(MAX_CONTENT_LENGTH)
    content: string;

    @IsString()
    @IsOptional()
    replyToId?: string;
}
