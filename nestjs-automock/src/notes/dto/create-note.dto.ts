import { IsDateString, IsString, Matches } from 'class-validator';

export class CreateNoteDto {
    @IsString()
    text: string;

    @Matches(/^#([A-Fa-f0-9]{6})$/)
    color: string;

    @IsDateString()
    dueTo: Date;
}
