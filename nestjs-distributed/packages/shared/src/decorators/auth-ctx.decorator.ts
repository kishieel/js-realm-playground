import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Auth } from '@lib/types/auth.type';

export const AuthCtx = createParamDecorator<{ failSafe: boolean }, ExecutionContext, Auth>((data, context) => {
    const request = context.switchToHttp().getRequest<{ headers: { [k: string]: string } }>();
    let auth: Auth | null;

    try {
        auth = JSON.parse(request.headers['x-internal']);
    } catch (e) {
        auth = null;
    }

    if (auth === null && !data?.failSafe) {
        throw new UnauthorizedException('Invalid or expired token');
    }

    return auth;
});
