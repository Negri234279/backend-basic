import { ConflictException, Controller, Get, Param, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { existsSync } from 'fs'
import { join } from 'path'
import { Public } from 'src/Core/infrastructure/decorators/public.decorator'

import { GetAvatarService } from '../services/getAvatar.service'

@ApiTags('Users')
@Controller('users')
export class UserGetAvatarController {
    constructor(private readonly getAvatarService: GetAvatarService) {}

    @Public()
    @Get('avatar/:username')
    async execute(@Param('username') username: string, @Res() res: Response): Promise<void> {
        const user = await this.getAvatarService.execute(username)

        const avatarPath = join(process.cwd(), 'uploads', 'avatars', user.avatar)

        const avatarExists = existsSync(avatarPath)
        if (!avatarExists) {
            throw new ConflictException('Avatar not found')
        }

        return res.sendFile(avatarPath)
    }
}
