import { Body, Controller, Param, Post, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserRole } from 'src/Contexts/Users/shared/userRole'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'

import { CreateCoachWorkoutDto } from '../dtos/createWorkout.dto'
import { idAthleteDto } from '../dtos/idAthlete.dto'
import { WorkoutCoachCreateService } from '../services/create.service'

@ApiTags('Workouts coach')
@Controller('workouts/coach')
export class WorkoutCoachCreateController {
    constructor(private readonly workoutCreateService: WorkoutCoachCreateService) {}

    @Post(':idAthlete/athlete')
    @Roles(UserRole.COACH)
    async execute(
        @Req() req: ReqPayload,
        @Param() { idAthlete }: idAthleteDto,
        @Body() body: CreateCoachWorkoutDto,
    ): Promise<void> {
        await this.workoutCreateService.execute(req.user.id, idAthlete, body)
    }
}
