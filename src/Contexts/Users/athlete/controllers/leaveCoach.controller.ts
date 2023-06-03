import { Controller, Patch, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { AccessToken } from 'src/Core/infrastructure/@types/userPayload'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'

import { AccessTokenDto } from '../../shared/dtos/accessTokenDto'
import { JwtProvider } from '../../shared/providers/jwt.service'
import { UserRemoveRoleService } from '../../shared/services/userRemoveRole.service'
import { UserRole } from '../../shared/userRole'

@ApiTags('Athletes')
@Controller('athletes')
export class UserRemoveCoachRoleController {
    constructor(
        private readonly removeRoleService: UserRemoveRoleService,
        private readonly jwtProvider: JwtProvider,
    ) {}

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Leave coach',
        description: 'Update the user role without be a coach and return a new access token.',
    })
    @ApiOkResponse({
        type: AccessTokenDto,
    })
    @Patch('leave-coach')
    @Roles(UserRole.ATHLETE)
    async execute(@Req() req: ReqPayload): Promise<AccessToken> {
        const user = await this.removeRoleService.execute(req.user.id, UserRole.COACH)
        const payload = user.toPayload()

        return await this.jwtProvider.signToken(payload)
    }
}
