import { UserRole } from 'src/Contexts/Users/shared/userRole'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'

import { Controller, Get, HttpException, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { WorkoutFindByAthleteService } from '../services/findByAthlete.service'
import { WorkoutModel } from '../workout.model'

@ApiTags('Workouts')
@Controller('workouts')
export class WorkoutFindByAthleteController {
    constructor(private readonly workoutFindByAthleteService: WorkoutFindByAthleteService) {}

    @Get()
    @Roles(UserRole.ATHLETE)
    async execute(@Req() req: ReqPayload): Promise<WorkoutModel[]> {
        const workouts = await this.workoutFindByAthleteService.execute(req.user)
        if (!workouts.length) {
            throw new HttpException('No workouts found', 204)
        }

        return workouts
    }
}
