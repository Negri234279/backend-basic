import { Controller, Get, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'

import { UserProfileService } from '../services/profile.service'
import { UserProfile } from '../../shared/@types/user'
import { ProfileDto } from '../dtos/profileDto'

@ApiTags('Users')
@Controller('users')
export class UserProfileController {
    constructor(private readonly userProfileService: UserProfileService) {}

    @Get()
    @ApiOperation({
        summary: 'Gets the profile of the authenticated user',
        description:
            'Gets the authenticated user profile data, including their username, email, and assigned roles.',
    })
    @ApiBearerAuth()
    @ApiOkResponse({ type: ProfileDto })
    async execute(@Req() req: ReqPayload): Promise<UserProfile> {
        const user = await this.userProfileService.execute(req.user.id)

        return user.toUserProfile()
    }
}
