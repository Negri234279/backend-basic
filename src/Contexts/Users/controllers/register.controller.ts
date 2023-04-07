import { Body, Controller, Post } from '@nestjs/common'
import { Public } from 'src/Core/infrastructure/decorators/public.decorator'
import { RegisterDto } from '../dtos'
import { UserRegisterService } from '../services/register.service'

@Controller('users')
export class UserRegisterController {
    constructor(private readonly userRegisterService: UserRegisterService) {}

    @Public()
    @Post('register')
    async execute(@Body() body: RegisterDto): Promise<void> {
        return await this.userRegisterService.execute(body)
    }
}
