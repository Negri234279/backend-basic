import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { Public } from 'src/Core/infrastructure/decorators/public.decorator'

import { LoginDto, RegisterDto } from './dtos'
import { UsersService } from './users.service'

import type { Request } from 'express'
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Public()
    @Post('register')
    async register(@Body() body: RegisterDto): Promise<void> {
        await this.usersService.register(body)
        return
    }

    @Public()
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
        return await this.usersService.login(loginDto)
    }

    @Get()
    async getProfile(@Req() req: Request): Promise<any> {
        const {
            id: _id,
            password: _password,
            ...profile
        } = await this.usersService.profile(req.user.id)
        return profile
    }
}
