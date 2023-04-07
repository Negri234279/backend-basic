import { Controller, Get, Req } from '@nestjs/common'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'

import { UserProfileService } from '../services/profile.service'
import { IUserProfile } from '../user'

@Controller('users')
export class UserProfileController {
    constructor(private readonly userProfileService: UserProfileService) {}

    @Get()
    async execute(@Req() req: ReqPayload): Promise<IUserProfile> {
        const user = await this.userProfileService.execute(req.user.id)

        return {
            username: user.username,
            email: user.email,
            role: user.role,
        }
    }
}
