import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { BaseEntity } from 'src/Core/infrastructure/mongodb/baseEntity'

import { UserRole } from '../userRole'

@Schema({ timestamps: true, collection: 'users' })
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

    @Prop({
        type: [String],
        ref: 'UserEntity',
        default: [],
        required: false,
    })
    athletes?: string[]

    @Prop({
        type: [String],
        ref: 'UserEntity',
        default: [],
        required: false,
    })
    athleteRequests?: string[]
}

export type UserDocument = HydratedDocument<UserEntity>
export const UserSchema = SchemaFactory.createForClass(UserEntity)
