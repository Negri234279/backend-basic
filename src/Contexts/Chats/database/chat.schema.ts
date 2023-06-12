import { HydratedDocument } from 'mongoose'
import { UserEntity } from 'src/Contexts/Users/shared/database/user.schema'
import { BaseEntity } from 'src/Core/infrastructure/mongodb/baseEntity'

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ timestamps: true, collection: 'chats' })
export class ChatEntity extends BaseEntity {
    @Prop({ required: true })
    text: string

    @Prop({ type: String, ref: 'UserEntity', required: true })
    from: string | UserEntity

    @Prop({ type: String, ref: 'UserEntity', required: true })
    to: string | UserEntity

    @Prop({ type: Date })
    date: Date
}

export type ChatDocument = HydratedDocument<ChatEntity>
export const ChatSchema = SchemaFactory.createForClass(ChatEntity)
