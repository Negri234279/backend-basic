import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, SortOrder } from 'mongoose'

import { WorkoutAthleteFiltersDto } from '../../athlete/dtos/workoutsAthleteFilters.dto'
import { WorkoutRepository } from '../@types/workout.repository'
import { WorkoutFiltersDto } from '../dtos/workoutsFilters.dto'
import { WorkoutModel } from '../workout.model'
import { WorkoutEntity } from './workout.schema'
import { WORKOUT_SORT_BY } from '../@types/workoutSort.enum'

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

    async findByAthlete(
        filters: WorkoutAthleteFiltersDto,
        athlete: string,
        coach?: string,
    ): Promise<WorkoutModel[]> {
        const query: FilterQuery<WorkoutEntity> = { athlete }

        console.log(filters)

        if (filters?.athlete && filters?.coach) {
            query.$or = [{ athlete, coach }, { coach: null }]
        } else if (filters?.coach) {
            query.coach = coach
        } else if (filters?.athlete) {
            query.coach = null
        } else {
            return []
        }

        if (filters?.startDate) {
            query.date = { $gte: new Date(filters.startDate) }
        }

        if (filters?.endDate) {
            query.date.$lte = filters.endDate
        }

        const sortQuery: { [key in keyof Partial<WorkoutEntity>]: SortOrder } = {
            date: filters?.sortBy === WORKOUT_SORT_BY.DEFAULT ? 1 : -1,
        }

        const workoutEntity = await this.collection.find(query).sort(sortQuery).lean().exec()

        return workoutEntity.map((workout) => this.toDomain(workout))
    }

    async findByCoach(
        athlete: string,
        coach?: string,
        filters?: WorkoutFiltersDto,
    ): Promise<WorkoutModel[]> {
        const query: FilterQuery<WorkoutEntity> = {
            $and: [{ athlete }, { coach: coach ?? null }],
        }

        if (filters?.startDate) {
            query.date = { $gte: new Date(filters.startDate) }
        }

        if (filters && filters.endDate) {
            query.date
                ? (query.date.$lte = filters.endDate)
                : (query.date = { $lte: filters.endDate })
        }

        const sortQuery: {
            [key in keyof Partial<WorkoutEntity>]: SortOrder
        } = {
            date: 1,
        }

        if (filters.sortBy === 1) {
            sortQuery.date = -1
        }

        const workoutEntity = await this.collection.find(query).sort(sortQuery).lean().exec()

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
