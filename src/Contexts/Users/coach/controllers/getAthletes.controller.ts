import { Controller, Get, HttpException, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'

import { AthleteProfile } from '../../shared/@types/user'
import { UserModel } from '../../shared/user.model'
import { UserRole } from '../../shared/userRole'
import { UserCoachGetAthletesService } from '../services/getAthletes.service'

@ApiTags('Coaches')
@Controller('coach')
export class UserCoachGetAthletesController {
    constructor(private readonly getAthletesService: UserCoachGetAthletesService) {}

    @ApiBearerAuth()
    @Get('athletes')
    @Roles(UserRole.COACH)
    async execute(@Req() req: ReqPayload): Promise<AthleteProfile[]> {
        const coach = await this.getAthletesService.execute(req.user.id)

        if (!coach.athletes.length) {
            throw new HttpException('No athletesfound', 204)
        }

        return this.serializeAthletes(coach)
    }

    private serializeAthletes(user: UserModel): AthleteProfile[] {
        const athletes = user.athletes as UserModel[]

        return athletes.map((athlete) => athlete.toAthleteProfile())
    }
}
