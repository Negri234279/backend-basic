import { UserRole } from 'src/Contexts/Users/shared/userRole'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'

import { Body, Controller, Post, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CreateWorkoutDto } from '../dtos/createWorkout.dto'
import { WorkoutCreateService } from '../services/create.service'

@ApiTags('Workouts')
@Controller('workouts')
export class WorkoutCreateController {
    constructor(private readonly workoutCreateService: WorkoutCreateService) {}

    @Post()
    @Roles(UserRole.ATHLETE)
    async execute(@Req() req: ReqPayload, @Body() body: CreateWorkoutDto): Promise<void> {
        await this.workoutCreateService.execute(req.user.id, body)
    }
}
