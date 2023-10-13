import { ApiProperty } from '@nestjs/swagger';

export class AuthTokenDto {
    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    refreshToken: string;
}
