import { Controller, Patch, Req } from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { AccessToken } from 'src/Core/infrastructure/@types/userPayload'

import { JwtProvider } from '../providers/jwt.service'
import { UserBecomeAthleteService } from '../services/becomeAthlete.service'
import { AccessTokenDto } from '../dtos/accessTokenDto'

@ApiTags('Users')
@Controller('users')
export class UserBecomeAthleteController {
    constructor(
        private readonly userBecomeAthleteService: UserBecomeAthleteService,
        private readonly jwtProvider: JwtProvider,
    ) {}

    @Patch('become-athlete')
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Become an athlete',
        description:
            'Update the users role to athlete and return a new access token.',
    })
    @ApiOkResponse({
        type: AccessTokenDto,
    })
    async execute(@Req() req: ReqPayload): Promise<AccessToken> {
        const payload = await this.userBecomeAthleteService.execute(req.user.id)

        return await this.jwtProvider.signToken(payload)
    }
}
