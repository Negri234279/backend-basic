import { Controller, Get, HttpException, Query, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserRole } from 'src/Contexts/Users/shared/userRole'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { IPaginatedRes } from 'src/Core/infrastructure/@types/pagination'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'

import { WorkoutFilters } from '../dtos/workoutsFilters.dto'
import { WorkoutFindByAthleteService } from '../services/findByAthlete.service'
import { WorkoutModel } from '../workout.model'

@ApiTags('Workouts')
@Controller('workouts')
export class WorkoutFindByAthleteController {
    constructor(private readonly workoutFindByAthleteService: WorkoutFindByAthleteService) {}

    @Get()
    @Roles(UserRole.ATHLETE)
    async execute(
        @Req() req: ReqPayload,
        @Query() filters: WorkoutFilters,
    ): Promise<IPaginatedRes<WorkoutModel>> {
        console.log(filters)

        const { data, count } = await this.workoutFindByAthleteService.execute(req.user, filters)
        if (!data.length) {
            throw new HttpException('No workouts found', 204)
        }

        return {
            data,
            count,
            currentPage: filters.page,
            totalPages: Math.ceil(count / filters.limit),
        }
    }
}
