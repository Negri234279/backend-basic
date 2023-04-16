import { UserRole } from 'src/Contexts/Users/userRole'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { IdDto } from 'src/Core/infrastructure/dtos/id.dto'

import { Controller, ForbiddenException, Get, Param, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { WorkoutFindOneByAthleteService } from '../services/findOneByAthlete.service'
import { WorkoutModel } from '../workout.model'

@ApiTags('Workouts')
@Controller('workouts')
export class WorkoutFindOneByAthleteController {
    constructor(
        private readonly workoutFindOneByAthleteService: WorkoutFindOneByAthleteService,
    ) {}

    @Get(':id')
    async execute(
        @Req() req: ReqPayload,
        @Param() { id }: IdDto,
    ): Promise<WorkoutModel> {
        if (!req.user.role.includes(UserRole.ATHLETE)) {
            throw new ForbiddenException()
        }

        return await this.workoutFindOneByAthleteService.execute(req.user, id)
    }
}
