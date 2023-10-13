import { CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { Auth } from '@lib/types/auth.type';

export const HasAllPermissions = (perms: string[]) => {
    return mixin(
        class implements CanActivate {
            canActivate(context: ExecutionContext): boolean {
                const request = context.switchToHttp().getRequest<{ headers: { [k: string]: string } }>();
                const auth: Auth = JSON.parse(request.headers['x-internal']);
                return perms.every((perm) => auth.user.permission.includes(perm));
            }
        },
    );
};

export const HasAnyPermissions = (perms: string[]) => {
    return mixin(
        class implements CanActivate {
            canActivate(context: ExecutionContext): boolean {
                const request = context.switchToHttp().getRequest<{ headers: { [k: string]: string } }>();
                const auth: Auth = JSON.parse(request.headers['x-internal']);
                return perms.some((perm) => auth.user.permission.includes(perm));
            }
        },
    );
};
