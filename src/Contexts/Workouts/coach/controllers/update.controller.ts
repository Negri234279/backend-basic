import { Body, Controller, HttpCode, Param, Patch, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserRole } from 'src/Contexts/Users/shared/userRole'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'

import { idWorkoutAndAthleteDto } from '../dtos/idWorkoutAndIdAthlete.dto'
import { UpdateCoachWorkoutDto } from '../dtos/updateWorkout.dto'
import { WorkoutCoachUpdateService } from '../services/update.service'

@ApiTags('Workouts coach')
@Controller('workouts/coach')
export class WorkoutCoachUpdateController {
    constructor(private readonly workoutUpdateService: WorkoutCoachUpdateService) {}

    @HttpCode(204)
    @Patch(':idWorkout/workout/:idAthlete/athlete')
    @Roles(UserRole.COACH)
    async execute(
        @Req() req: ReqPayload,
        @Param() ids: idWorkoutAndAthleteDto,
        @Body() body: UpdateCoachWorkoutDto,
    ): Promise<void> {
        await this.workoutUpdateService.execute(req.user.id, ids, body)
    }
}
