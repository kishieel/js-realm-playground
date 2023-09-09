import { ConfigType, registerAs } from '@nestjs/config';

export const gameConfig = registerAs('DB_CONFIG_TOKEN', () => ({
    boardSize: { x: 30, y: 30 },
}));

export const GAME_CONFIG_KEY = gameConfig.KEY;

export type GameConfig = ConfigType<typeof gameConfig>;
