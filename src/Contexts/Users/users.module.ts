import { Module } from '@nestjs/common'
import { JwtGlobalModule } from 'src/Core/infrastructure/jwt.module'

import { UsersController } from './users.controller'
import { UsersRepository } from './users.repository'
import { UsersService } from './users.service'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
    imports: [JwtGlobalModule],
    providers: [UsersService, UsersRepository, LocalStrategy],
    controllers: [UsersController],
})
export class UsersModule {}
