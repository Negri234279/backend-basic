import { Controller, Delete, HttpCode, Param, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'
import { IdDto } from 'src/Core/infrastructure/dtos/id.dto'

import { UserRole } from '../../shared/userRole'
import { UserCoachRejectAthleteService } from '../services/rejectAthlete.service'

@ApiTags('Coaches')
@Controller('coaches')
export class UserCoachRejectAthleteController {
    constructor(private readonly rejectAthleteService: UserCoachRejectAthleteService) {}

    @ApiBearerAuth()
    @HttpCode(204)
    @Delete(':id/reject-athlete')
    @Roles(UserRole.COACH)
    async execute(@Req() req: ReqPayload, @Param() { id }: IdDto): Promise<void> {
        await this.rejectAthleteService.execute(id, req.user.id)
    }
}
