import { UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { MessagingService, RpcType } from '@kishieel/nestjs-distributed-messaging';

export const decodeTokenMiddleware =
    (messagingService: MessagingService) => async (req: Request, res: Response, next: NextFunction) => {
        delete req.headers['x-internal'];
        const token = req.headers['authorization'];

        if (typeof token === 'string') {
            try {
                const jwt = token.replace('Bearer ', '');
                const response = await firstValueFrom(messagingService.send(RpcType.DecodeJwt, { jwt }));

                req.headers['x-internal'] = JSON.stringify(response);
            } catch (error) {
                throw new UnauthorizedException(error, 'Invalid or expired token');
            }
        }

        next();
    };
