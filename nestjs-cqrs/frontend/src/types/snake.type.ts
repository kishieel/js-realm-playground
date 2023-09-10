import { Color } from '../enums/color.enum';
import { Coords } from './coords.type';

export type Snake = {
    id: string;
    tail: Coords[];
    color: Color;
}
