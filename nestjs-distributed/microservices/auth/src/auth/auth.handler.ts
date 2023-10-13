import { Controller } from '@nestjs/common';
import { AuthService } from '@app/auth/auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcRequestContent, RpcResponseContent, RpcType } from '@kishieel/nestjs-distributed-messaging';

@Controller()
export class AuthHandler {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern(RpcType.DecodeJwt)
    decodeToken(@Payload() data: RpcRequestContent<RpcType.DecodeJwt>): Promise<RpcResponseContent<RpcType.DecodeJwt>> {
        return this.authService.decodeToken(data.jwt);
    }
}
