import { HydratedDocument } from 'mongoose'
import { UserEntity } from 'src/Contexts/Users/database/user.schema'
import { BaseEntity } from 'src/Core/infrastructure/mongodb/baseEntity'

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ timestamps: true, collection: 'comments' })
export class CommentEntity extends BaseEntity {
    @Prop({ required: true })
    text: string

    @Prop({ type: String, ref: 'UserEntity', required: true })
    authorId: string | UserEntity

    @Prop({ type: String, ref: 'WorkoutEntity', required: true })
    workouId: string
}

export type CommentDocument = HydratedDocument<CommentEntity>
export const CommentSchema = SchemaFactory.createForClass(CommentEntity)
