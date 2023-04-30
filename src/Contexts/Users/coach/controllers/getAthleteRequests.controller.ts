import { Controller, Get, HttpException, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'

import { AthleteProfile } from '../../shared/@types/user'
import { UserRole } from '../../shared/userRole'
import { UserCoachGetAthleteRequestsService } from '../services/getAthleteRequests.service'
import { UserModel } from '../../shared/user.model'

@ApiTags('Coaches')
@Controller('coach')
export class UserCoachGetAthleteRequestsController {
    constructor(private readonly getAthleteRequestsService: UserCoachGetAthleteRequestsService) {}

    @ApiBearerAuth()
    @Get('athlete-requests')
    @Roles(UserRole.COACH)
    async execute(@Req() req: ReqPayload): Promise<AthleteProfile[]> {
        const coach = await this.getAthleteRequestsService.execute(req.user.id)

        if (!coach.athleteRequests.length) {
            throw new HttpException('No athlete requests found', 204)
        }

        return this.serializeAthletes(coach)
    }

    private serializeAthletes(user: UserModel): AthleteProfile[] {
        const athletes = user.athleteRequests as UserModel[]

        return athletes.map((athlete) => athlete.toAthleteProfile())
    }
}
