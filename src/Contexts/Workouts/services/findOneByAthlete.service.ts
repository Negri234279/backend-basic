import { UsersRepository } from 'src/Contexts/Users/shared/database/users.repository'
import { UserPayload } from 'src/Core/infrastructure/@types/userPayload'

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'

import { WorkoutsRepository } from '../database/workouts.repository'
import { WorkoutModel } from '../workout.model'

@Injectable()
export class WorkoutFindOneByAthleteService {
    constructor(
        private readonly workoutsRepository: WorkoutsRepository,
        private readonly usersRepository: UsersRepository,
    ) {}

    async execute(user: UserPayload, id: string): Promise<WorkoutModel> {
        const userExist = await this.usersRepository.exist(user.id)
        if (!userExist) {
            throw new ConflictException()
        }

        const workout = await this.workoutsRepository.findOneByAthelte(user.id, id)
        if (!workout) {
            throw new NotFoundException()
        }

        return workout
    }
}
