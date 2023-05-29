import { UserRole } from 'src/Contexts/Users/shared/userRole'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'
import { IdDto } from 'src/Core/infrastructure/dtos/id.dto'

import { Body, Controller, HttpCode, Param, Patch, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { UpdateworkoutDto } from '../dtos/updateWorkout.dto'
import { WorkoutUpdateService } from '../services/update.service'

@ApiTags('Workouts athlete')
@Controller('workouts/athlete')
export class WorkoutUpdateController {
    constructor(private readonly workoutUpdateService: WorkoutUpdateService) {}

    @HttpCode(204)
    @Patch(':id')
    @Roles(UserRole.ATHLETE)
    async execute(
        @Req() req: ReqPayload,
        @Param() { id }: IdDto,
        @Body() body: UpdateworkoutDto,
    ): Promise<void> {
        await this.workoutUpdateService.execute(req.user, id, body)
    }
}
