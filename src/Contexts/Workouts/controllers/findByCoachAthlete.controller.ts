import { Controller, Get, Query, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserRole } from 'src/Contexts/Users/shared/userRole'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { PaginationRes } from 'src/Core/infrastructure/@types/pagination'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'

import { WorkoutFilters } from '../dtos/workoutsFilters.dto'
import { WorkoutModel } from '../workout.model'
import { WorkoutFindByCoachAthleteService } from '../services/findByCoachAthlete.service'

@ApiTags('Workouts')
@Controller('workouts')
export class WorkoutFindByCoachAthleteController {
    constructor(
        private readonly workoutFindByCoachAthleteService: WorkoutFindByCoachAthleteService,
    ) {}

    @Get('coach')
    @Roles(UserRole.ATHLETE)
    async execute(
        @Req() req: ReqPayload,
        @Query() filters: WorkoutFilters,
    ): Promise<PaginationRes<WorkoutModel>> {
        return await this.workoutFindByCoachAthleteService.execute(req.user.id, filters)
    }
}
