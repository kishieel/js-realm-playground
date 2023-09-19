import { WsException } from '@nestjs/websockets';

export class MissingNicknameError extends WsException {
    public readonly code = 'MISSING_NICKNAME';
}
