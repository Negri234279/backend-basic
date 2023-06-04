import { Controller, Delete, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { AccessToken } from 'src/Core/infrastructure/@types/userPayload'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'

import { JwtProvider } from '../../shared/providers/jwt.service'
import { UserRole } from '../../shared/userRole'
import { AthleteLeaveCoachService } from '../services/leaveCoach.service'

@ApiTags('Athletes')
@Controller('athletes')
export class AthleteLeaveCoachController {
    constructor(
        private readonly leaveCoachService: AthleteLeaveCoachService,
        private readonly jwtProvider: JwtProvider,
    ) {}

    @ApiBearerAuth()
    @Delete('leave-coach')
    @Roles(UserRole.ATHLETE)
    async execute(@Req() req: ReqPayload): Promise<AccessToken> {
        const user = await this.leaveCoachService.execute(req.user.id)

        const payload = user.toPayload()

        return await this.jwtProvider.signToken(payload)
    }
}
