import { Controller, Get, Query, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { PaginationRes } from 'src/Core/infrastructure/@types/pagination'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'
import { PaginationDto } from 'src/Core/infrastructure/dtos/pagination.dto'

import { AthleteProfile } from '../../shared/@types/user'
import { UserModel } from '../../shared/user.model'
import { UserRole } from '../../shared/userRole'
import { UserCoachGetAthleteRequestsService } from '../services/getAthleteRequests.service'

@ApiTags('Coaches')
@Controller('coaches')
export class UserCoachGetAthleteRequestsController {
    constructor(private readonly getAthleteRequestsService: UserCoachGetAthleteRequestsService) {}

    @ApiBearerAuth()
    @Get('athlete-requests')
    @Roles(UserRole.COACH)
    async execute(
        @Req() req: ReqPayload,
        @Query() pagination: PaginationDto,
    ): Promise<PaginationRes<AthleteProfile>> {
        const athletes = await this.getAthleteRequestsService.execute(req.user.id, pagination)

        const data = this.serializeAthletes(athletes.data)

        return { ...athletes, data }
    }

    private serializeAthletes(users: UserModel[]): AthleteProfile[] {
        return users.map((athlete) => athlete.toAthleteProfile())
    }
}
