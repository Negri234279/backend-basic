import { Controller, Patch, Req } from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { AccessToken } from 'src/Core/infrastructure/@types/userPayload'

import { AccessTokenDto } from '../dtos/accessTokenDto'
import { JwtProvider } from '../providers/jwt.service'
import { UserAddCoachRoleService } from '../services/addCoachRole.service'

@ApiTags('Users')
@Controller('users')
export class UserAddCoachRoleController {
    constructor(
        private readonly userAddCoachRoleService: UserAddCoachRoleService,
        private readonly jwtProvider: JwtProvider,
    ) {}

    @Patch('add-coach-role')
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Become a coach',
        description: 'Promote the current user to coach status',
    })
    @ApiOkResponse({
        type: AccessTokenDto,
    })
    async execute(@Req() req: ReqPayload): Promise<AccessToken> {
        const user = await this.userAddCoachRoleService.execute(req.user.id)
        const payload = user.toPayload()

        return await this.jwtProvider.signToken(payload)
    }
}
