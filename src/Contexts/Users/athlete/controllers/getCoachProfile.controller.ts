import { Controller, Get, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'

import { CoachProfile } from '../../shared/@types/user'
import { UserRole } from '../../shared/userRole'
import { AthleteGetCoachProfileService } from '../services/getCoachProfile.service'

@ApiTags('Athletes')
@Controller('athletes')
export class AthleteGetCoachProfileController {
    constructor(private readonly getCoachProfileService: AthleteGetCoachProfileService) {}

    @ApiBearerAuth()
    @Get('coach-profile')
    @Roles(UserRole.ATHLETE)
    async execute(@Req() req: ReqPayload): Promise<CoachProfile> {
        const coach = await this.getCoachProfileService.execute(req.user.id)

        return coach.toCoachProfile()
    }
}
