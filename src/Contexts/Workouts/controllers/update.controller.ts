import { UserRole } from 'src/Contexts/Users/userRole'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'

import {
    Body,
    Controller,
    ForbiddenException,
    HttpCode,
    Param,
    Patch,
    Req,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { UpdateworkoutDto } from '../dtos/updateWorkout.dto'
import { WorkoutUpdateService } from '../services/update.service'

@ApiTags('Workouts')
@Controller('workouts')
export class WorkoutUpdateController {
    constructor(private readonly workoutUpdateService: WorkoutUpdateService) {}

    @HttpCode(204)
    @Patch(':id')
    async execute(
        @Req() req: ReqPayload,
        @Param('id') id: string,
        @Body() body: UpdateworkoutDto,
    ): Promise<void> {
        if (!req.user.role.includes(UserRole.ATHLETE)) {
            throw new ForbiddenException()
        }

        this.workoutUpdateService.execute(req.user, id, body)
    }
}
