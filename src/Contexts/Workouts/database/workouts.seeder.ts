import { Model } from 'mongoose'
import { Seeder } from 'nestjs-seeder'
import { coach } from 'src/Contexts/Users/database/users.seeder'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { WorkoutEntity } from './workout.schema'
import {
    getDateBetweenOfMonth,
    getDateBetweenOfWeek,
    workoutFactory,
} from './workoutFactory.herper'

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
            const workout = workoutFactory()

            workouts.push(workout)
        }

        for (let i = 0; i < numWorkoutsSeeder; i++) {
            const workout = workoutFactory({ coachId: coach.id })

            workouts.push(workout)
        }

        // Workouts random on the same day
        for (let i = 0; i < 6; i++) {
            const date = new Date(new Date().setHours(0, 0, 0, 0))
            const workout = workoutFactory({ date })

            workouts.push(workout)
        }

        for (let i = 0; i < 6; i++) {
            const date = new Date(new Date().setHours(0, 0, 0, 0))
            const workout = workoutFactory({ coachId: coach.id, date })

            workouts.push(workout)
        }

        // Workouts random on the same week
        for (let i = 0; i < 30; i++) {
            const workout = workoutFactory({ date: getDateBetweenOfWeek() })

            workouts.push(workout)
        }

        for (let i = 0; i < 30; i++) {
            const workout = workoutFactory({
                coachId: coach.id,
                date: getDateBetweenOfWeek(),
            })

            workouts.push(workout)
        }

        // Workouts random on the same month
        for (let i = 0; i < 40; i++) {
            const workout = workoutFactory({ date: getDateBetweenOfMonth() })

            workouts.push(workout)
        }

        for (let i = 0; i < 40; i++) {
            const workout = workoutFactory({
                coachId: coach.id,
                date: getDateBetweenOfMonth(),
            })

            workouts.push(workout)
        }

        return this.collection.insertMany(workouts)
    }

    async drop(): Promise<any> {
        return this.collection.deleteMany({})
    }
}
