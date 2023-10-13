import { Auth } from '@kishieel/nestjs-distributed-shared';

export type DecodeJwtPayload = {
    request: { jwt: string };
    response: Auth;
};
