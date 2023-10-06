import { CanActivate, ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common';

export const AUTH_SECRET_TOKEN = 'AUTH_SECRET_TOKEN';

@Injectable()
export class AuthSecretGuard implements CanActivate {
    private readonly logger = new Logger(AuthSecretGuard.name);

    constructor(@Inject(AUTH_SECRET_TOKEN) private readonly authSecret: string) {
        this.logger.debug(`${AuthSecretGuard.name} initialized with secret: ${this.authSecret}`);
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const secret = request?.headers?.authorization?.replace('Bearer ', '');

        return secret === this.authSecret;
    }
}
