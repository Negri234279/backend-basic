import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Public } from 'src/Core/infrastructure/decorators/public.decorator'
import { AuthGuard } from '@nestjs/passport'

import { LoginDto, RegisterDto } from './dtos'
import { IUserProfile } from './user'
import { UsersService } from './users.service'

import type { Request } from 'express'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { UserPayload } from 'src/Core/infrastructure/@types/userPayload'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    @Public()
    @Post('register')
    async register(@Body() body: RegisterDto): Promise<void> {
        await this.usersService.register(body)
        return
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @Req() req: Request,
        @Body() _loginDto: LoginDto,
    ): Promise<{ access_token: string }> {
        const access_token = await this.jwtService.signAsync(req.user, {
            expiresIn: '7d',
        })

        return { access_token }
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
}
