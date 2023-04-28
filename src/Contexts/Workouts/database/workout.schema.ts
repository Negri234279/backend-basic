import { HydratedDocument } from 'mongoose'
import { BaseEntity } from 'src/Core/infrastructure/mongodb/baseEntity'

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ timestamps: true, collection: 'workouts' })
export class WorkoutEntity extends BaseEntity {
    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    sets: number

    @Prop({ required: true })
    reps: number

    @Prop({ required: true })
    weight: number

    @Prop({ required: true })
    date: Date

    @Prop({ required: true, default: null })
    isCompleted: boolean

    @Prop({ default: null })
    isSuccessful: boolean

    @Prop({ type: String, ref: 'UserEntity', required: true })
    athlete: string

    @Prop({ type: String, ref: 'UserEntity', default: null })
    coach?: string
}

export type WorkoutDocument = HydratedDocument<WorkoutEntity>
export const WorkoutSchema = SchemaFactory.createForClass(WorkoutEntity)
