import {IsNotEmpty, IsString} from "class-validator";
import { ApiParam, ApiProperty } from '@nestjs/swagger';

export class SignInDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;
}
