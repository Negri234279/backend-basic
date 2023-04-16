import { UserRole } from 'src/Contexts/Users/userRole'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'

import {
    Controller,
    ForbiddenException,
    Get,
    HttpException,
    Req,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { WorkoutFindByAthleteService } from '../services/findByAthlete.service'
import { WorkoutModel } from '../workout.model'

@ApiTags('Workouts')
@Controller('workouts')
export class WorkoutFindByAthleteController {
    constructor(
        private readonly workoutFindByAthleteService: WorkoutFindByAthleteService,
    ) {}

    @Get()
    async execute(@Req() req: ReqPayload): Promise<WorkoutModel[]> {
        if (!req.user.role.includes(UserRole.ATHLETE)) {
            throw new ForbiddenException()
        }

        const workouts = await this.workoutFindByAthleteService.execute(
            req.user,
        )
        if (!workouts.length) {
            throw new HttpException('No workouts found', 204)
        }

        return workouts
    }
}
