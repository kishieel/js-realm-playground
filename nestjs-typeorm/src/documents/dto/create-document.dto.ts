import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateDocumentDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsNumber()
    @IsPositive()
    createdById: number;

    @IsPositive({ each: true })
    @IsNumber(undefined, { each: true })
    @IsArray()
    reviewedByIds: number[];
}
