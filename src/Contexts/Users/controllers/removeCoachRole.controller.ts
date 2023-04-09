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
import { UserRemoveCoachRoleService } from '../services/removeCoachRole.service'

@ApiTags('Users')
@Controller('users')
export class UserRemoveCoachRoleController {
    constructor(
        private readonly userRemoveCoachRoleService: UserRemoveCoachRoleService,
        private readonly jwtProvider: JwtProvider,
    ) {}

    @Patch('remove-coach-role')
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Become an athlete',
        description:
            'Update the users role to athlete and return a new access token.',
    })
    @ApiOkResponse({
        type: AccessTokenDto,
    })
    async execute(@Req() req: ReqPayload): Promise<AccessToken> {
        const user = await this.userRemoveCoachRoleService.execute(req.user.id)
        const payload = user.toPayload()

        return await this.jwtProvider.signToken(payload)
    }
}
