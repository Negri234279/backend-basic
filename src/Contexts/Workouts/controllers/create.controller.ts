import { UserRole } from 'src/Contexts/Users/userRole'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'

import { Body, Controller, ForbiddenException, Post, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CreateWorkoutDto } from '../dtos/createWorkout.dto'
import { WorkoutCreateService } from '../services/create.service'

@ApiTags('Workouts')
@Controller('workouts')
export class WorkoutCreateController {
    constructor(private readonly workoutCreateService: WorkoutCreateService) {}

    @Post()
    async execute(
        @Req() req: ReqPayload,
        @Body() body: CreateWorkoutDto,
    ): Promise<void> {
        if (!req.user.role.includes(UserRole.ATHLETE)) {
            throw new ForbiddenException()
        }

        await this.workoutCreateService.execute(req.user, body)
    }
}
