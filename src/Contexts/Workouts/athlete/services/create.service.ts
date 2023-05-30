import { ConflictException, Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/Contexts/Users/shared/database/users.repository'

import { WorkoutsRepository } from '../../shared/database/workouts.repository'
import { CreateWorkoutDto } from '../dtos/createWorkout.dto'
import { WorkoutModel } from '../../shared/workout.model'

@Injectable()
export class WorkoutCreateService {
    constructor(
        private readonly workoutsRepository: WorkoutsRepository,
        private readonly usersRepository: UsersRepository,
    ) {}

    async execute(athleteId: string, createDto: CreateWorkoutDto): Promise<void> {
        const userExist = await this.usersRepository.exist(athleteId)
        if (!userExist) {
            throw new ConflictException()
        }

        const workoutExist = await this.workoutsRepository.exist(createDto.id)
        if (workoutExist) {
            throw new ConflictException()
        }

        const newDate = new Date()

        const workout = new WorkoutModel({
            ...createDto,
            athlete: athleteId,
            coach: null,
            createdAt: newDate,
            updatedAt: newDate,
        })

        await this.workoutsRepository.save(workout)
    }
}
