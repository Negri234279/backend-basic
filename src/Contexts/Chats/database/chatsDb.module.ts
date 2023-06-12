import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ChatEntity, ChatSchema } from './chat.schema'

@Module({
    imports: [MongooseModule.forFeature([{ name: ChatEntity.name, schema: ChatSchema }])],
    exports: [MongooseModule.forFeature([{ name: ChatEntity.name, schema: ChatSchema }])],
})
export class ChatsDbModule {}
