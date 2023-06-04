import { Controller, Param, Post, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'
import { IdDto } from 'src/Core/infrastructure/dtos/id.dto'

import { UserRole } from '../../shared/userRole'
import { AthleteSendRequestToCoachService } from '../services/sendRequestToCoach.service'

@ApiTags('Athletes')
@Controller('athletes')
export class AthleteSendRequestToCoachController {
    constructor(private readonly sendRequestToCoachService: AthleteSendRequestToCoachService) {}

    @ApiBearerAuth()
    @Post(':id/send-request-to-coach')
    @Roles(UserRole.ATHLETE)
    async execute(@Req() req: ReqPayload, @Param() { id }: IdDto): Promise<void> {
        await this.sendRequestToCoachService.execute(req.user.id, id)
    }
}
