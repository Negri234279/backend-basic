import { Controller, Param, Post, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'
import { IdDto } from 'src/Core/infrastructure/dtos/id.dto'

import { UserRole } from '../../shared/userRole'
import { UserCoachAcceptAthleteService } from '../services/acceptAthlete.service'

@ApiTags('Coaches')
@Controller('coaches')
export class UserCoachAcceptAthleteController {
    constructor(private readonly acceptAthleteService: UserCoachAcceptAthleteService) {}

    @ApiBearerAuth()
    @Post(':id/accept-athlete')
    @Roles(UserRole.COACH)
    async execute(@Req() req: ReqPayload, @Param() { id }: IdDto): Promise<void> {
        await this.acceptAthleteService.execute(id, req.user.id)
    }
}
