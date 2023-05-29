import { Model } from 'mongoose'
import { Seeder } from 'nestjs-seeder'
import { coach } from 'src/Contexts/Users/shared/database/users.seeder'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { WorkoutEntity } from './workout.schema'
import {
    getDateBetweenOfMonth,
    getDateBetweenOfWeek,
    workoutFactory,
} from './workoutFactory.herper'
import { Workout } from '../@types/workout'

@Injectable()
export class WorkoutsSeeder implements Seeder {
    constructor(
        @InjectModel(WorkoutEntity.name)
        private readonly collection: Model<WorkoutEntity>,
    ) {}

    async seed(): Promise<any> {
        const numWorkoutsSeeder = Number(process.env.WORKOUTS_SEEDER) ?? 200
        const workouts: WorkoutEntity[] = []

        // Workouts random
        for (let i = 0; i < numWorkoutsSeeder; i++) {
            const newWorkout = workoutFactory()

            workouts.push(newWorkout)
        }

        for (let i = 0; i < numWorkoutsSeeder; i++) {
            const newWorkout = workoutFactory({ coach: coach.id })

            workouts.push(newWorkout)
        }

        // Workouts random on the same day
        for (let i = 0; i < 6; i++) {
            const date = new Date(new Date().setHours(0, 0, 0, 0))
            const newWorkout = workoutFactory({ date })

            workouts.push(newWorkout)
        }

        for (let i = 0; i < 6; i++) {
            const date = new Date(new Date().setHours(0, 0, 0, 0))
            const newWorkout = workoutFactory({ coach: coach.id, date })

            workouts.push(newWorkout)
        }

        const date = new Date(new Date().setHours(0, 0, 0, 0))
        const newWorkout = workoutFactory({ id: workout.id, date })

        workouts.push(newWorkout)

        // Workouts random on the same week
        for (let i = 0; i < 30; i++) {
            const newWorkout = workoutFactory({ date: getDateBetweenOfWeek() })

            workouts.push(newWorkout)
        }

        for (let i = 0; i < 30; i++) {
            const newWorkout = workoutFactory({
                coach: coach.id,
                date: getDateBetweenOfWeek(),
            })

            workouts.push(newWorkout)
        }

        // Workouts random on the same month
        for (let i = 0; i < 40; i++) {
            const newWorkout = workoutFactory({ date: getDateBetweenOfMonth() })

            workouts.push(newWorkout)
        }

        for (let i = 0; i < 40; i++) {
            const newWorkout = workoutFactory({
                coach: coach.id,
                date: getDateBetweenOfMonth(),
            })

            workouts.push(newWorkout)
        }

        return this.collection.insertMany(workouts)
    }

    async drop(): Promise<any> {
        return this.collection.deleteMany({})
    }
}

export const workout: Partial<Workout> = {
    id: '9c1d27dc-0118-4486-bfee-ab9513ac7940',
}
