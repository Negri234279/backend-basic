import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UserEntity, UserSchema } from './user.schema'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UserEntity.name, schema: UserSchema },
        ]),
    ],
    exports: [
        MongooseModule.forFeature([
            { name: UserEntity.name, schema: UserSchema },
        ]),
    ],
})
export class UsersDbModule {}
