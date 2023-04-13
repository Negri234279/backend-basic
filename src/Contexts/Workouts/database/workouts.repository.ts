import { Model } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { WorkoutModel } from '../workout.model'
import { WorkoutEntity } from './workout.schema'

@Injectable()
export class WorkoutsRepository {
    constructor(
        @InjectModel(WorkoutEntity.name)
        private readonly collection: Model<WorkoutEntity>,
    ) {}

    async exist(id: string): Promise<boolean> {
        return !!(await this.collection.countDocuments({ _id: id }).exec())
    }

    async findOne(id: string): Promise<WorkoutModel | null> {
        const workoutEntity = await this.collection.findById(id).lean().exec()
        if (!workoutEntity) {
            return null
        }

        return this.toDomain(workoutEntity)
    }

    async findByAthelte(id: string): Promise<WorkoutModel[]> {
        const workoutEntity = await this.collection
            .find({ athelteId: id })
            .lean()
            .exec()

        return workoutEntity.map((workout) => this.toDomain(workout))
    }

    async save(workout: WorkoutModel): Promise<void> {
        const newWorkout = this.toPersistance(workout)
        const createdWorkout = new this.collection(newWorkout)

        await createdWorkout.save()
    }

    async update(workout: WorkoutModel): Promise<void> {
        workout.updatedAt = new Date()

        const { _id, ...rest } = this.toPersistance(workout)

        await this.collection.updateOne({ _id }, rest).exec()
    }

    async delete(id: string): Promise<void> {
        await this.collection.deleteOne({ _id: id }).exec()
    }

    private toPersistance(workoutModel: WorkoutModel): WorkoutEntity {
        const workoutEntity = new WorkoutEntity()
        workoutEntity._id = workoutModel.id
        workoutEntity.name = workoutModel.name
        workoutEntity.sets = workoutModel.sets
        workoutEntity.reps = workoutModel.reps
        workoutEntity.weight = workoutModel.weight
        workoutEntity.date = workoutModel.date
        workoutEntity.isCompleted = workoutModel.isCompleted
        workoutEntity.isSuccessful = workoutModel.isSuccessful
        workoutEntity.athelteId = workoutModel.athleteId
        workoutEntity.coachId = workoutModel.coachId
        workoutEntity.createdAt = workoutModel.createdAt
        workoutEntity.updatedAt = workoutModel.updatedAt

        return workoutEntity
    }

    private toDomain(workoutEntity: WorkoutEntity): WorkoutModel {
        return new WorkoutModel({
            id: workoutEntity._id,
            name: workoutEntity.name,
            sets: workoutEntity.sets,
            reps: workoutEntity.reps,
            weight: workoutEntity.weight,
            date: workoutEntity.date,
            isCompleted: workoutEntity.isCompleted,
            isSuccessful: workoutEntity.isSuccessful,
            athleteId: workoutEntity.athelteId,
            coachId: workoutEntity.coachId,
            createdAt: workoutEntity.createdAt,
            updatedAt: workoutEntity.updatedAt,
        })
    }
}
