import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { UsersRepository } from 'src/Contexts/Users/shared/database/users.repository'

import { WorkoutsRepository } from '../database/workouts.repository'
import { WorkoutModel } from '../workout.model'

@Injectable()
export class WorkoutFindOneService {
    constructor(
        private readonly workoutsRepository: WorkoutsRepository,
        private readonly usersRepository: UsersRepository,
    ) {}

    async execute(idUser: string, idWorkout: string): Promise<WorkoutModel> {
        const userExist = await this.usersRepository.exist(idUser)
        if (!userExist) {
            throw new ConflictException()
        }

        const workout = await this.workoutsRepository.findOne(idWorkout)
        if (!workout) {
            throw new NotFoundException()
        }

        return workout
    }
}
