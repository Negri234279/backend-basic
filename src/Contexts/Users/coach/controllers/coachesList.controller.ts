import { Controller, Get, Query, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { PaginationRes } from 'src/Core/infrastructure/@types/pagination'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'
import { PaginationDto } from 'src/Core/infrastructure/dtos/pagination.dto'

import { CoachProfile } from '../../shared/@types/user'
import { UserModel } from '../../shared/user.model'
import { UserRole } from '../../shared/userRole'
import { UserCoachesListService } from '../services/coachesList.service'

@ApiTags('Coaches')
@Controller('coaches')
export class UserCoachesListController {
    constructor(private readonly userCoachesListService: UserCoachesListService) {}

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Get list of coaches',
        description:
            'Returns a list of all coaches registered in the system, with their basic information and coach-specific details',
    })
    @Get()
    @Roles(UserRole.ATHLETE, UserRole.COACH)
    async execute(
        @Req() req: ReqPayload,
        @Query() pagination: PaginationDto,
    ): Promise<PaginationRes<CoachProfile & { hasRequest: boolean }>> {
        const { data, ...restPagination } = await this.userCoachesListService.execute(
            req.user.id,
            pagination,
        )

        const coachesProfiles = this.serializeCoaches(data, req.user.id)

        return {
            data: coachesProfiles,
            ...restPagination,
        }
    }

    private serializeCoaches(user: UserModel[], idAthlete: string): any[] {
        return user.map((coach: UserModel): CoachProfile & { hasRequest: boolean } => {
            return {
                hasRequest: coach.hasAthleteRequest(idAthlete),
                ...coach.toCoachProfile(),
            }
        })
    }
}
