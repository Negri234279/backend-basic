import { Module } from '@nestjs/common'
import { JwtGlobalModule } from 'src/Core/infrastructure/jwt.module'

import { UsersController } from './users.controller'
import { UsersRepository } from './users.repository'
import { UsersService } from './users.service'

@Module({
    imports: [JwtGlobalModule],
    providers: [UsersService, UsersRepository],
    controllers: [UsersController],
})
export class UsersModule {}
