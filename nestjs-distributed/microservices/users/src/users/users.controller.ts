import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth, AuthCtx, AuthGuard, HasAllPermissions, Permission } from '@kishieel/nestjs-distributed-shared';
import { UsersService } from '@app/users/users.service';
import { UpdateUserDto } from '@app/users/dtos/update-user.dto';

@Controller()
@ApiTags('Users API')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/me')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    getSignedInUser(@AuthCtx() auth: Auth) {
        return this.usersService.getUserByUuid(auth.user.uuid);
    }

    @Patch('/me')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    updateSignedInUser(@AuthCtx() auth: Auth, @Body() dto: UpdateUserDto) {
        return this.usersService.updateUser(
            { uuid: auth.user.uuid },
            {
                username: dto.username,
                firstName: dto.firstName,
                lastName: dto.lastName,
                avatarUrl: dto.avatarUrl,
            },
        );
    }

    @Delete('/me')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    deleteSignedInUser(@AuthCtx() auth: Auth) {
        return this.usersService.deleteUser({ uuid: auth.user.uuid });
    }

    @Get(':uuid')
    @UseGuards(AuthGuard, HasAllPermissions([Permission.UserRead]))
    @ApiBearerAuth()
    getUser(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
        return this.usersService.getUserByUuid(uuid);
    }

    @Get()
    @UseGuards(AuthGuard, HasAllPermissions([Permission.UserRead]))
    @ApiBearerAuth()
    getUsers() {
        return this.usersService.getManyUsers();
    }

    @Patch(':uuid')
    @UseGuards(AuthGuard, HasAllPermissions([Permission.UserWrite]))
    @ApiBearerAuth()
    updateUser(@Param('uuid', new ParseUUIDPipe()) uuid: string, @Body() dto: UpdateUserDto) {
        return this.usersService.updateUser(
            { uuid },
            {
                username: dto.username,
                firstName: dto.firstName,
                lastName: dto.lastName,
                avatarUrl: dto.avatarUrl,
            },
        );
    }

    @Delete(':uuid')
    @UseGuards(AuthGuard, HasAllPermissions([Permission.UserWrite]))
    @ApiBearerAuth()
    deleteUser(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
        return this.usersService.deleteUser({ uuid });
    }
}
