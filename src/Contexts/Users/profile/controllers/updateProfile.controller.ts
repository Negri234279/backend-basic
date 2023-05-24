import { Body, Controller, Patch, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'

import { ProfileUpdateDto } from '../dtos/updateProfile.dto'
import { UpdateUserProfileService } from '../services/updateProfile.service'

@ApiTags('Users')
@Controller('users')
export class UserProfileUpdateController {
    constructor(private readonly updateUserProfileService: UpdateUserProfileService) {}

    @Patch()
    @ApiBearerAuth()
    async execute(@Req() req: ReqPayload, @Body() body: ProfileUpdateDto): Promise<void> {
        await this.updateUserProfileService.execute(req.user.id, body)
    }
}
