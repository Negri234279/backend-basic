import { Body, Controller, HttpCode, Patch, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'

import { ChangePasswordDto } from '../../shared/dtos'
import { UserChangePasswordService } from '../services/changePassword.service'

@ApiTags('Authentications')
@Controller('auth')
export class UserChangePasswordController {
    constructor(private readonly userChangePasswordService: UserChangePasswordService) {}

    @HttpCode(204)
    @Patch('change-password')
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Change user password',
        description: 'Updates the password of the authenticated user',
    })
    @ApiBody({ type: ChangePasswordDto })
    async execute(@Req() req: ReqPayload, @Body() body: ChangePasswordDto): Promise<void> {
        await this.userChangePasswordService.execute(req.user.id, body)
    }
}
