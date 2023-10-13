import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @Length(1, 255)
    username?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @Length(1, 255)
    firstName?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @Length(1, 255)
    lastName?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsUrl()
    avatarUrl?: string;
}
