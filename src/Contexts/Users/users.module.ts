import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtGlobalModule } from 'src/Core/infrastructure/jwt.module'

import { UserControllers } from './controllers'
import { UserProviders } from './providers'
import { UserServices } from './services'
import { LocalStrategy } from './strategies/local.strategy'
import { UserEntity, UserSchema } from './user.schema'
import { UsersRepository } from './users.repository'

@Module({
    imports: [
        JwtGlobalModule,
        MongooseModule.forFeature([
            { name: UserEntity.name, schema: UserSchema },
        ]),
    ],
    providers: [
        ...UserServices,
        ...UserProviders,
        UsersRepository,
        LocalStrategy,
    ],
    controllers: [...UserControllers],
})
export class UsersModule {}
