import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { AccessToken } from 'src/Core/infrastructure/@types/userPayload'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'

import { Controller, Patch, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import { AccessTokenDto } from '../../shared/dtos/accessTokenDto'
import { JwtProvider } from '../../shared/providers/jwt.service'
import { UserAddCoachRoleService } from '../services/addCoachRole.service'
import { UserRole } from '../../shared/userRole'

@ApiTags('Users')
@Controller('users')
export class UserAddCoachRoleController {
    constructor(
        private readonly userAddCoachRoleService: UserAddCoachRoleService,
        private readonly jwtProvider: JwtProvider,
    ) {}

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Become a coach',
        description: 'Promote the current user to coach status',
    })
    @ApiOkResponse({
        type: AccessTokenDto,
    })
    @Patch('add-coach-role')
    @Roles(UserRole.ATHLETE)
    async execute(@Req() req: ReqPayload): Promise<AccessToken> {
        const user = await this.userAddCoachRoleService.execute(req.user.id)
        const payload = user.toPayload()

        return await this.jwtProvider.signToken(payload)
    }
}
