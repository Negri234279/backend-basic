import {
    Body,
    Controller,
    Get,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { AccessToken } from 'src/Core/infrastructure/@types/userPayload'
import { Public } from 'src/Core/infrastructure/decorators/public.decorator'

import { ChangePasswordDto, RegisterDto } from './dtos'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { IUserProfile } from './user'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Public()
    @Post('register')
    async register(@Body() body: RegisterDto): Promise<void> {
        return await this.usersService.register(body)
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: ReqPayload): Promise<AccessToken> {
        return await this.usersService.signToken(req.user)
    }

    @Get()
    async getProfile(@Req() req: ReqPayload): Promise<IUserProfile> {
        const user = await this.usersService.profile(req.user.id)

        return {
            username: user.username,
            email: user.email,
            role: user.role,
        }
    }

    @Patch('become-coach')
    async becomeCoach(@Req() req: ReqPayload): Promise<AccessToken> {
        const payload = await this.usersService.becomeCoach(req.user.id)

        return await this.usersService.signToken(payload)
    }

    @Patch('become-athlete')
    async becomeAthlete(@Req() req: ReqPayload): Promise<AccessToken> {
        const payload = await this.usersService.becomeAthlete(req.user.id)

        return await this.usersService.signToken(payload)
    }

    @Patch('change-password')
    async changePassword(
        @Req() req: ReqPayload,
        @Body() body: ChangePasswordDto,
    ): Promise<void> {
        return await this.usersService.changePassword(req.user.id, body)
    }
}
