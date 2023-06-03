import { Controller, Delete, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'

import { UserRole } from '../../shared/userRole'
import { AthleteLeaveCoachService } from '../services/leaveCoach.service'

@ApiTags('Athletes')
@Controller('athletes')
export class AthleteLeaveCoachController {
    constructor(private readonly leaveCoachService: AthleteLeaveCoachService) {}

    @ApiBearerAuth()
    @Delete('leave-coach')
    @Roles(UserRole.ATHLETE)
    async execute(@Req() req: ReqPayload): Promise<void> {
        await this.leaveCoachService.execute(req.user.id)
    }
}
