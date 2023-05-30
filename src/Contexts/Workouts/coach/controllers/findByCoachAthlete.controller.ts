import { Controller, Get, Query, Req, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserRole } from 'src/Contexts/Users/shared/userRole'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { PaginationRes } from 'src/Core/infrastructure/@types/pagination'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'

import { WorkoutModel } from '../../shared/workout.model'
import { WorkoutFindByCoachAthleteService } from '../services/findByCoachAthlete.service'
import { WorkoutFiltersWithPaginationDto } from '../../shared/dtos/workoutFiltersWithPagination.dto'
import { IdDto } from 'src/Core/infrastructure/dtos/id.dto'

@ApiTags('Workouts coach')
@Controller('workouts/coach')
export class WorkoutFindByCoachAthleteController {
    constructor(
        private readonly workoutFindByCoachAthleteService: WorkoutFindByCoachAthleteService,
    ) {}

    @Get('/:id/athlete')
    @Roles(UserRole.ATHLETE)
    async execute(
        @Req() req: ReqPayload,
        @Param() { id }: IdDto,
        @Query() filters: WorkoutFiltersWithPaginationDto,
    ): Promise<PaginationRes<WorkoutModel>> {
        return await this.workoutFindByCoachAthleteService.execute(id, req.user.id, filters)
    }
}
