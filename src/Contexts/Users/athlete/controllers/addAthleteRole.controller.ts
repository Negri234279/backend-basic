import { Controller, Patch, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { AccessToken } from 'src/Core/infrastructure/@types/userPayload'

import { AccessTokenDto } from '../../shared/dtos/accessTokenDto'
import { JwtProvider } from '../../shared/providers/jwt.service'
import { UserAddRoleService } from '../../shared/services/userAddRole.service'
import { UserRole } from '../../shared/userRole'

@ApiTags('Athletes')
@Controller('athletes')
export class AthleteAddRoleController {
    constructor(
        private readonly addRoleService: UserAddRoleService,
        private readonly jwtProvider: JwtProvider,
    ) {}

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Become a athlete',
        description: 'Update the user role with a athlete and return a new access token',
    })
    @ApiOkResponse({
        type: AccessTokenDto,
    })
    @Patch('add-role')
    async execute(@Req() req: ReqPayload): Promise<AccessToken> {
        const user = await this.addRoleService.execute(req.user.id, UserRole.ATHLETE)
        const payload = user.toPayload()

        return await this.jwtProvider.signToken(payload)
    }
}
