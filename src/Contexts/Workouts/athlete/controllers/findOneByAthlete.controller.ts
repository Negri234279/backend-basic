import { UserRole } from 'src/Contexts/Users/shared/userRole'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'
import { IdDto } from 'src/Core/infrastructure/dtos/id.dto'

import { Controller, Get, Param, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { WorkoutFindOneByAthleteService } from '../services/findOneByAthlete.service'
import { WorkoutModel } from '../../shared/workout.model'

@ApiTags('Workouts athlete')
@Controller('workouts/athlete')
export class WorkoutFindOneByAthleteController {
    constructor(private readonly workoutFindOneByAthleteService: WorkoutFindOneByAthleteService) {}

    @Get(':id')
    @Roles(UserRole.ATHLETE)
    async execute(@Req() req: ReqPayload, @Param() { id }: IdDto): Promise<WorkoutModel> {
        return await this.workoutFindOneByAthleteService.execute(req.user, id)
    }
}
