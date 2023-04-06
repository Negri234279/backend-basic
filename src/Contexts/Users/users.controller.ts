import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/Core/infrastructure/guards/auth.guard'

import { LoginDto, RegisterDto } from './dtos'
import { UsersService } from './users.service'

import type { Request } from 'express'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    async register(@Body() body: RegisterDto): Promise<void> {
        await this.usersService.register(body)
        return
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
        return await this.usersService.login(loginDto)
    }

    @UseGuards(AuthGuard)
    @Get('')
    async getProfile(@Req() req: Request): Promise<any> {
        const { password: _, ...profile } = await this.usersService.profile(
            req.user.id,
        )
        return profile
    }
}
