import { PartialType } from '@nestjs/swagger';
import { CreatePostDto } from '@app/posts/dtos/create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
