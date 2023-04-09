import { Module } from '@nestjs/common'
import { JwtGlobalModule } from 'src/Core/infrastructure/jwt.module'

import { UserControllers } from './controllers'
import { UserProviders } from './providers'
import { UserServices } from './services'
import { LocalStrategy } from './strategies/local.strategy'
import { UsersRepository } from './database/users.repository'
import { UsersDbModule } from './database/usersDb.module'

@Module({
    imports: [JwtGlobalModule, UsersDbModule],
    providers: [
        ...UserServices,
        ...UserProviders,
        UsersRepository,
        LocalStrategy,
    ],
    controllers: [...UserControllers],
})
export class UsersModule {}
