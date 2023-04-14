import { UserRole } from 'src/Contexts/Users/userRole'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { IdDto } from 'src/Core/infrastructure/dtos/id.dto'

import {
    Controller,
    Delete,
    ForbiddenException,
    HttpCode,
    Param,
    Req,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { WorkoutDeleteService } from '../services/delete.service'

@ApiTags('Workouts')
@Controller('workouts')
export class WorkoutDeleteController {
    constructor(private readonly workoutDeleteService: WorkoutDeleteService) {}

    @HttpCode(204)
    @Delete(':id')
    async execute(
        @Req() req: ReqPayload,
        @Param() { id }: IdDto,
    ): Promise<void> {
        if (!req.user.role.includes(UserRole.ATHLETE)) {
            throw new ForbiddenException()
        }

        await this.workoutDeleteService.execute(req.user, id)
    }
}
