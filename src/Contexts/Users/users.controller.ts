import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Public } from 'src/Core/infrastructure/decorators/public.decorator'

import { LoginDto, RegisterDto } from './dtos'
import { IUserProfile } from './user'
import { UsersService } from './users.service'

import type { Request } from 'express'

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
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
        const payload = await this.usersService.login(loginDto)

        const access_token = await this.jwtService.signAsync(payload, {
            expiresIn: '7d',
        })

        return { access_token }
    }

    @Get()
    async getProfile(@Req() req: Request): Promise<IUserProfile> {
        const user = await this.usersService.profile(req.user.id)

        return {
            username: user.username,
            email: user.email,
            role: user.role,
        }
    }
}
