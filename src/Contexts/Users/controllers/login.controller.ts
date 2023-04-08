import { Controller, Post, Req, UseGuards } from '@nestjs/common'
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { AccessToken } from 'src/Core/infrastructure/@types/userPayload'
import { Public } from 'src/Core/infrastructure/decorators/public.decorator'

import { LoginDto } from '../dtos'
import { AccessTokenDto } from '../dtos/accessTokenDto'
import { LocalAuthGuard } from '../guards/local-auth.guard'
import { JwtProvider } from '../providers/jwt.service'

@ApiTags('Users')
@Controller('users')
export class UserLoginController {
    constructor(private readonly jwtProvider: JwtProvider) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiOperation({
        summary: 'Log in a user',
        description:
            'Authenticate a user with their email and password, and return an access token in the response.',
    })
    @ApiBody({ type: LoginDto })
    @ApiCreatedResponse({
        type: AccessTokenDto,
    })
    async execute(@Req() req: ReqPayload): Promise<AccessToken> {
        return await this.jwtProvider.signToken(req.user)
    }
}
