import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Public } from 'src/Core/infrastructure/decorators/public.decorator'

import { RegisterDto } from '../../shared/dtos'
import { UserRegisterService } from '../services/register.service'

@ApiTags('Authentications')
@Controller('auth')
export class UserRegisterController {
    constructor(private readonly userRegisterService: UserRegisterService) {}

    @Public()
    @Post('register')
    @ApiOperation({
        summary: 'Register a new user',
        description: 'Registers a new user with the provided credentials',
    })
    @ApiBody({ type: RegisterDto })
    async execute(@Body() body: RegisterDto): Promise<void> {
        return await this.userRegisterService.execute(body)
    }
}
