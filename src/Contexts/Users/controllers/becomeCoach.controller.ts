import { Controller, Patch, Req } from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { AccessToken } from 'src/Core/infrastructure/@types/userPayload'

import { AccessTokenDto } from '../dtos/accessTokenDto'
import { JwtProvider } from '../providers/jwt.service'
import { UserBecomeCoachService } from '../services/becomeCoach.service'

@ApiTags('Users')
@Controller('users')
export class UserBecomeCoachController {
    constructor(
        private readonly userBecomeCoachService: UserBecomeCoachService,
        private readonly jwtProvider: JwtProvider,
    ) {}

    @Patch('become-coach')
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Become a coach',
        description: 'Promote the current user to coach status',
    })
    @ApiOkResponse({
        type: AccessTokenDto,
    })
    async execute(@Req() req: ReqPayload): Promise<AccessToken> {
        const payload = await this.userBecomeCoachService.execute(req.user.id)

        return await this.jwtProvider.signToken(payload)
    }
}
