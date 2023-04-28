import { Body, Controller, Patch, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'

import { ResetPasswordDto } from '../dtos'
import { UserResetPasswordService } from '../services/resetPassword.service'

@ApiTags('Users')
@Controller('users')
export class UserResetPasswordController {
    constructor(private readonly userResetPasswordService: UserResetPasswordService) {}

    @Patch('reset-password')
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Reset User Password',
        description:
            'Reset the password for the specified user and send the new password by email.',
    })
    @ApiBody({ type: ResetPasswordDto })
    async execute(@Req() req: ReqPayload, @Body() body: ResetPasswordDto): Promise<string> {
        return await this.userResetPasswordService.execute(req.user.id, body)
    }
}
