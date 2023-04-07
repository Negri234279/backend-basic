import { Controller, Patch, Req } from '@nestjs/common'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { AccessToken } from 'src/Core/infrastructure/@types/userPayload'

import { JwtProvider } from '../providers/jwt.service'
import { UserBecomeCoachService } from '../services/becomeCoach.service'

@Controller('users')
export class UserBecomeCoachController {
    constructor(
        private readonly userBecomeCoachService: UserBecomeCoachService,
        private readonly jwtProvider: JwtProvider,
    ) {}

    @Patch('become-coach')
    async execute(@Req() req: ReqPayload): Promise<AccessToken> {
        const payload = await this.userBecomeCoachService.execute(req.user.id)

        return await this.jwtProvider.signToken(payload)
    }
}
