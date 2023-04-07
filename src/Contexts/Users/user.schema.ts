import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { UserRole } from './userRole'

export type UserDocument = HydratedDocument<UserEntity>

@Schema()
export class UserEntity {
    @Prop({ required: true, _id: false })
    _id: string

    @Prop({ required: true })
    username: string

    @Prop({ required: true })
    password: string

    @Prop({ required: true })
    email: string

    @Prop({
        required: true,
        type: [String],
        enum: [UserRole.ATHLETE, UserRole.COACH],
    })
    role: UserRole[]
}

export const UserSchema = SchemaFactory.createForClass(UserEntity)
