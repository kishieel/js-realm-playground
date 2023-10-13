import { BadRequestException } from '@nestjs/common';

export class UsernameTakenError extends BadRequestException {}
