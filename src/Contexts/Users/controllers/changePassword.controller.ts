import { Body, Controller, Patch, Req } from '@nestjs/common'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'

import { ChangePasswordDto } from '../dtos'
import { UserChangePasswordService } from '../services/changePassword.service'

@Controller('users')
export class UserChangePasswordController {
    constructor(
        private readonly userChangePasswordService: UserChangePasswordService,
    ) {}

    @Patch('change-password')
    async execute(
        @Req() req: ReqPayload,
        @Body() body: ChangePasswordDto,
    ): Promise<void> {
        return await this.userChangePasswordService.execute(req.user.id, body)
    }
}
