import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { UserRole } from './userRole'
import { BaseEntity } from 'src/Core/infrastructure/mongodb/baseEntity'

@Schema({ timestamps: true })
export class UserEntity extends BaseEntity {
    @Prop({ required: true })
    username: string

    @Prop({ required: true })
    password: string

    @Prop({ required: true })
    email: string

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    surname: string

    @Prop({
        required: true,
        type: [String],
        enum: [UserRole.ATHLETE, UserRole.COACH],
    })
    role: UserRole[]

    @Prop({ type: String, ref: 'UserEntity', default: null })
    coach?: string
}

export type UserDocument = HydratedDocument<UserEntity>
export const UserSchema = SchemaFactory.createForClass(UserEntity)
