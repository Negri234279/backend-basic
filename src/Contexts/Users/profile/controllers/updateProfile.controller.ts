import { Body, Controller, Patch, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { AccessToken } from 'src/Core/infrastructure/@types/userPayload'

import { JwtProvider } from '../../shared/providers/jwt.service'
import { ProfileUpdateDto } from '../dtos/updateProfile.dto'
import { UpdateUserProfileService } from '../services/updateProfile.service'

@ApiTags('Users')
@Controller('users')
export class UserProfileUpdateController {
    constructor(
        private readonly updateUserProfileService: UpdateUserProfileService,
        private readonly jwtProvider: JwtProvider,
    ) {}

    @Patch()
    @ApiBearerAuth()
    async execute(@Req() req: ReqPayload, @Body() body: ProfileUpdateDto): Promise<AccessToken> {
        const user = await this.updateUserProfileService.execute(req.user.id, body)
        const payload = user.toPayload()

        return await this.jwtProvider.signToken(payload)
    }
}
