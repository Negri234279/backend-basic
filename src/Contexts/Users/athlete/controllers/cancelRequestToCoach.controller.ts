import { Controller, Delete, HttpCode, Param, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'
import { IdDto } from 'src/Core/infrastructure/dtos/id.dto'

import { UserRole } from '../../shared/userRole'
import { AthleteCancelRequestToCoachService } from '../services/cancelRequestToCoach.service'

@ApiTags('Athletes')
@Controller('athletes')
export class AthleteCancelRequestToCoachController {
    constructor(private readonly cancelRequestToCoachService: AthleteCancelRequestToCoachService) {}

    @ApiBearerAuth()
    @HttpCode(204)
    @Delete(':id/cancel-request-to-coach')
    @Roles(UserRole.ATHLETE)
    async execute(@Req() req: ReqPayload, @Param() { id }: IdDto): Promise<void> {
        await this.cancelRequestToCoachService.execute(req.user.id, id)
    }
}
