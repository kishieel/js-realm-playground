export class FruitEatenEvent {
    constructor(
        public readonly fruitId: string,
        public readonly snakeId: string,
    ) {
    }
}
