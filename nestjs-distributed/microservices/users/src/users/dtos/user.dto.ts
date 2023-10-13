import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty()
    uuid: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    avatarUrl: string;
}
