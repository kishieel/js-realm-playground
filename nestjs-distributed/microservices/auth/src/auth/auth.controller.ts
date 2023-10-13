import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthTokenDto } from '@app/auth/dtos/auth-token.dto';
import { AuthService } from '@app/auth/auth.service';
import { SignUpDto } from '@app/auth/dtos/sign-up.dto';
import { SignInDto } from '@app/auth/dtos/sign-in.dto';
import { ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller()
@ApiTags('Auth API')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/sign-up')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: AuthTokenDto })
    @ApiUnauthorizedResponse({ type: null }) // @fixme
    signUp(@Body() dto: SignUpDto): Promise<AuthTokenDto> {
        return this.authService.signUp(dto);
    }

    @Post('/sign-in')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: AuthTokenDto })
    @ApiUnauthorizedResponse({ type: null }) // @fixme
    signIn(@Body() dto: SignInDto): Promise<AuthTokenDto> {
        return this.authService.signIn(dto);
    }
}
