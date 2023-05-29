import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { WorkoutRepository } from '../@types/workout.repository'
import { WorkoutModel } from '../workout.model'
import { WorkoutEntity } from './workout.schema'

@Injectable()
export class WorkoutsRepository implements WorkoutRepository {
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

    async findOneByAthelte(athlete: string, id: string): Promise<WorkoutModel | null> {
        const workoutEntity = await this.collection
            .findOne({
                _id: id,
                athlete,
            })
            .lean()
            .exec()
        if (!workoutEntity) {
            return null
        }

        return this.toDomain(workoutEntity)
    }

    async findByAthelte(athlete: string, coach?: string): Promise<WorkoutModel[]> {
        const workoutEntity = await this.collection
            .find({
                $and: [{ athlete }, { coach: coach ?? null }],
            })
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
        workoutEntity.athlete = workoutModel.athlete
        workoutEntity.coach = workoutModel.coach
        workoutEntity.createdAt = workoutModel.createdAt
        workoutEntity.updatedAt = workoutModel.updatedAt

        return workoutEntity
    }

    private toDomain(workoutEntity: WorkoutEntity): WorkoutModel {
        const { _id: id, isCompleted, isSuccessful, coach } = workoutEntity

        return new WorkoutModel({
            ...workoutEntity,
            id,
            isCompleted,
            isSuccessful,
            coach,
        })
    }
}
