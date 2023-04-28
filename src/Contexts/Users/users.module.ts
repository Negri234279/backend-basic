import { JwtGlobalModule } from 'src/Core/infrastructure/jwt.module'

import { Module } from '@nestjs/common'

import { UserControllers } from './controllers'
import { UsersRepository } from './database/users.repository'
import { UsersDbModule } from './database/usersDb.module'
import { UserProviders } from './providers'
import { UserServices } from './services'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
    imports: [JwtGlobalModule, UsersDbModule],
    providers: [...UserServices, ...UserProviders, UsersRepository, LocalStrategy],
    controllers: [...UserControllers],
    exports: [UsersRepository, UsersDbModule],
})
export class UsersModule {}
