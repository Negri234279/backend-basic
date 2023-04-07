import { Controller, Post, Req, UseGuards } from '@nestjs/common'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { AccessToken } from 'src/Core/infrastructure/@types/userPayload'
import { Public } from 'src/Core/infrastructure/decorators/public.decorator'

import { LocalAuthGuard } from '../guards/local-auth.guard'
import { JwtProvider } from '../providers/jwt.service'

@Controller('users')
export class UserLoginController {
    constructor(private readonly jwtProvider: JwtProvider) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async execute(@Req() req: ReqPayload): Promise<AccessToken> {
        return await this.jwtProvider.signToken(req.user)
    }
}
