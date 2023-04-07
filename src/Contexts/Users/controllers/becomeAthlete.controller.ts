import { Controller, Patch, Req } from '@nestjs/common'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { AccessToken } from 'src/Core/infrastructure/@types/userPayload'

import { JwtProvider } from '../providers/jwt.service'
import { UserBecomeAthleteService } from '../services/becomeAthlete.service'

@Controller('users')
export class UserBecomeAthleteController {
    constructor(
        private readonly userBecomeAthleteService: UserBecomeAthleteService,
        private readonly jwtProvider: JwtProvider,
    ) {}

    @Patch('become-athlete')
    async execute(@Req() req: ReqPayload): Promise<AccessToken> {
        const payload = await this.userBecomeAthleteService.execute(req.user.id)

        return await this.jwtProvider.signToken(payload)
    }
}
