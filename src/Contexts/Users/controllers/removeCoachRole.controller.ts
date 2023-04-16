import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { AccessToken } from 'src/Core/infrastructure/@types/userPayload'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'

import { Controller, Patch, Req } from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger'

import { AccessTokenDto } from '../dtos/accessTokenDto'
import { JwtProvider } from '../providers/jwt.service'
import { UserRemoveCoachRoleService } from '../services/removeCoachRole.service'
import { UserRole } from '../userRole'

@ApiTags('Users')
@Controller('users')
export class UserRemoveCoachRoleController {
    constructor(
        private readonly userRemoveCoachRoleService: UserRemoveCoachRoleService,
        private readonly jwtProvider: JwtProvider,
    ) {}

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Become an athlete',
        description:
            'Update the users role to athlete and return a new access token.',
    })
    @ApiOkResponse({
        type: AccessTokenDto,
    })
    @Patch('remove-coach-role')
    @Roles(UserRole.COACH)
    async execute(@Req() req: ReqPayload): Promise<AccessToken> {
        const user = await this.userRemoveCoachRoleService.execute(req.user.id)
        const payload = user.toPayload()

        return await this.jwtProvider.signToken(payload)
    }
}
