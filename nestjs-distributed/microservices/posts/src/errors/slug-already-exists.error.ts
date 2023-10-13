import { BadRequestException } from '@nestjs/common';

export class SlugAlreadyExistsError extends BadRequestException {}
