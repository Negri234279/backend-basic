import { UsersRepository } from 'src/Contexts/Users/database/users.repository'
import { UserPayload } from 'src/Core/infrastructure/@types/userPayload'

import { ConflictException, Injectable } from '@nestjs/common'

import { WorkoutsRepository } from '../database/workouts.repository'
import { CreateWorkoutDto } from '../dtos/createWorkout.dto'
import { WorkoutModel } from '../workout.model'

@Injectable()
export class WorkoutCreateService {
    constructor(
        private readonly workoutsRepository: WorkoutsRepository,
        private readonly usersRepository: UsersRepository,
    ) {}

    async execute(
        user: UserPayload,
        createDto: CreateWorkoutDto,
    ): Promise<any> {
        const userExist = await this.usersRepository.exist(user.id)
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
            isCompleted: createDto?.isCompleted,
            isSuccessful: createDto?.isSuccessful,
            athleteId: user.id,
            coachId: createDto?.coachId,
            createdAt: newDate,
            updatedAt: newDate,
        })

        await this.workoutsRepository.save(workout)
    }
}
