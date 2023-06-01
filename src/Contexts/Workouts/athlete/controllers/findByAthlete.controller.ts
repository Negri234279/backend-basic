import { Controller, Get, Query, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserRole } from 'src/Contexts/Users/shared/userRole'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { PaginationRes } from 'src/Core/infrastructure/@types/pagination'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'

import { WorkoutModel } from '../../shared/workout.model'
import { WorkoutAthleteFiltersWithPaginationDto } from '../dtos/workoutsAthleteFiltersWithPagination.dto'
import { WorkoutFindByAthleteService } from '../services/findByAthlete.service'

@ApiTags('Workouts athlete')
@Controller('workouts/athlete')
export class WorkoutFindByAthleteController {
    constructor(private readonly workoutFindByAthleteService: WorkoutFindByAthleteService) {}

    @Get()
    @Roles(UserRole.ATHLETE)
    async execute(
        @Req() req: ReqPayload,
        @Query() filters: WorkoutAthleteFiltersWithPaginationDto,
    ): Promise<PaginationRes<WorkoutModel>> {
        return await this.workoutFindByAthleteService.execute(req.user.id, filters)
    }
}
