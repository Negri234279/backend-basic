import { Controller, Delete, HttpCode, Param, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserRole } from 'src/Contexts/Users/shared/userRole'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'

import { idWorkoutAndAthleteDto } from '../dtos/idWorkoutAndIdAthlete.dto'
import { WorkoutCoachDeleteService } from '../services/delete.service'

@ApiTags('Workouts coach')
@Controller('workouts/coach')
export class WorkoutCoachDeleteController {
    constructor(private readonly workoutDeleteService: WorkoutCoachDeleteService) {}

    @HttpCode(204)
    @Delete(':idWorkout/workout/:idAthlete/athlete')
    @Roles(UserRole.COACH)
    async execute(@Req() req: ReqPayload, @Param() ids: idWorkoutAndAthleteDto): Promise<void> {
        await this.workoutDeleteService.execute(req.user.id, ids)
    }
}
