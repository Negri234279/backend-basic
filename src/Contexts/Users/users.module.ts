import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtGlobalModule } from 'src/Core/infrastructure/jwt.module'

import { LocalStrategy } from './strategies/local.strategy'
import { UserEntity, UserSchema } from './user.schema'
import { UsersController } from './users.controller'
import { UsersRepository } from './users.repository'
import { UsersService } from './users.service'

@Module({
    imports: [
        JwtGlobalModule,
        MongooseModule.forFeature([
            { name: UserEntity.name, schema: UserSchema },
        ]),
    ],
    providers: [UsersService, UsersRepository, LocalStrategy],
    controllers: [UsersController],
})
export class UsersModule {}
