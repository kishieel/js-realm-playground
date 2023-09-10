import { Direction } from '../enums/direction.enum';
import { IsEnum } from 'class-validator';

export class DirectionChangedDto {
    @IsEnum(Direction)
    direction: Direction;
}
