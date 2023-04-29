import { JwtGlobalModule } from 'src/Core/infrastructure/jwt.module'

import { Module } from '@nestjs/common'

import { UserControllers } from './shared/controllers'
import { UsersRepository } from './shared/database/users.repository'
import { UsersDbModule } from './shared/database/usersDb.module'
import { UserProviders } from './shared/providers'
import { UserServices } from './shared/services'
import { LocalStrategy } from './auth/strategies/local.strategy'

@Module({
    imports: [JwtGlobalModule, UsersDbModule],
    providers: [...UserServices, ...UserProviders, UsersRepository, LocalStrategy],
    controllers: [...UserControllers],
    exports: [UsersRepository, UsersDbModule],
})
export class UsersModule {}
