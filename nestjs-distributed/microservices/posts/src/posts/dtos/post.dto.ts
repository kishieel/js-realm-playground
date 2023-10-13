import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
    @ApiProperty()
    uuid: string;

    @ApiProperty()
    slug: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    body: string;

    @ApiProperty()
    createdByUuid: string;
}
