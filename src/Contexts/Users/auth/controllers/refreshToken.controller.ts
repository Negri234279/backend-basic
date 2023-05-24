import { Controller, Post, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { AccessToken } from 'src/Core/infrastructure/@types/userPayload'

import { UserProfileService } from '../../profile/services/profile.service'
import { JwtProvider } from '../../shared/providers/jwt.service'

@ApiTags('Authentications')
@Controller('auth')
export class UserRefreshTokenController {
    constructor(
        private readonly userProfileService: UserProfileService,
        private readonly jwtProvider: JwtProvider,
    ) {}

    @Post('refresh-token')
    @ApiBearerAuth()
    async execute(@Req() req: ReqPayload): Promise<AccessToken> {
        const user = await this.userProfileService.execute(req.user.id)
        const payload = user.toPayload()

        return await this.jwtProvider.signToken(payload)
    }
}
