import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from '@app/auth/dtos/sign-up.dto';
import { AuthTokenDto } from '@app/auth/dtos/auth-token.dto';
import { SignInDto } from '@app/auth/dtos/sign-in.dto';
import { PrismaService } from '@app/prisma/prisma.factory';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Auth, Role } from '@kishieel/nestjs-distributed-shared';
import { Eventbus, EventType, MessagingService } from '@kishieel/nestjs-distributed-messaging';
import { UserWithRolePermissions } from '@app/auth/auth.interfaces';

@Injectable()
export class AuthService {
    constructor(
        @Inject(PrismaService)
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        @Inject(Eventbus.Global)
        private readonly globalEventbus: MessagingService,
    ) {}

    async signUp(dto: SignUpDto): Promise<AuthTokenDto> {
        const userExists = await this.prismaService.user.exists({ username: dto.username });

        if (userExists) {
            throw new BadRequestException('Username already exists');
        }

        const password = await hash(dto.password);
        const user = await this.prismaService.user.create({
            data: { username: dto.username, password: password, role: { connect: { name: Role.User } } },
            include: { role: { include: { permissions: { include: { permission: true } } } } },
        });

        this.globalEventbus.emit(EventType.UserCreated, {
            uuid: user.uuid,
            password: user.password,
            username: user.username,
            roleUuid: user.roleUuid,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });

        return await this.createAuthToken(user);
    }

    async signIn(dto: SignInDto): Promise<AuthTokenDto> {
        const user = await this.prismaService.user.findUnique({
            where: { username: dto.username },
            include: { role: { include: { permissions: { include: { permission: true } } } } },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid username or password');
        }

        const passwordValid = await verify(user.password, dto.password);
        if (!passwordValid) {
            throw new UnauthorizedException('Invalid username or password');
        }

        return await this.createAuthToken(user);
    }

    private async createAuthToken(user: UserWithRolePermissions): Promise<AuthTokenDto> {
        const jwtClaims: Auth = {
            user: {
                uuid: user.uuid,
                username: user.username,
                role: user.role.name,
                permission: user.role.permissions.map(({ permission }) => permission.name),
            },
        };

        return {
            accessToken: this.jwtService.sign({ sub: user.uuid, ...jwtClaims }, { expiresIn: '15m' }),
            refreshToken: this.jwtService.sign({ sub: user.uuid }, { expiresIn: '1d' }),
        };
    }

    async decodeToken(jwt: string): Promise<Auth> {
        let ctx: Auth;

        try {
            ctx = this.jwtService.decode(jwt, { json: false }) as Auth;
        } catch (error) {
            throw new UnauthorizedException(error, 'Invalid or expired token');
        }

        return ctx;
    }
}
