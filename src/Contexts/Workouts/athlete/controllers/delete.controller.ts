import { UserRole } from 'src/Contexts/Users/shared/userRole'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'
import { IdDto } from 'src/Core/infrastructure/dtos/id.dto'

import { Controller, Delete, HttpCode, Param, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { WorkoutDeleteService } from '../services/delete.service'

@ApiTags('Workouts athlete')
@Controller('workouts/athlete')
export class WorkoutDeleteController {
    constructor(private readonly workoutDeleteService: WorkoutDeleteService) {}

    @HttpCode(204)
    @Delete(':id')
    @Roles(UserRole.ATHLETE)
    async execute(@Req() req: ReqPayload, @Param() { id }: IdDto): Promise<void> {
        await this.workoutDeleteService.execute(req.user, id)
    }
}
