import { Controller, Get, Param, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserRole } from 'src/Contexts/Users/shared/userRole'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'
import { IdDto } from 'src/Core/infrastructure/dtos/id.dto'

import { WorkoutFindOneService } from '../services/findOne.service'
import { WorkoutModel } from '../workout.model'

@ApiTags('Workouts')
@Controller('workout')
export class WorkoutFindOneController {
    constructor(private readonly workoutFindOneService: WorkoutFindOneService) {}

    @Get(':id')
    @Roles(UserRole.ATHLETE, UserRole.COACH)
    async execute(@Req() req: ReqPayload, @Param() { id }: IdDto): Promise<WorkoutModel> {
        return await this.workoutFindOneService.execute(req.user.id, id)
    }
}
