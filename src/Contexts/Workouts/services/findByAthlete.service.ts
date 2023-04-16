import { UsersRepository } from 'src/Contexts/Users/database/users.repository'
import { UserPayload } from 'src/Core/infrastructure/@types/userPayload'

import { ConflictException, Injectable } from '@nestjs/common'

import { WorkoutsRepository } from '../database/workouts.repository'
import { WorkoutModel } from '../workout.model'

@Injectable()
export class WorkoutFindByAthleteService {
    constructor(
        private readonly workoutsRepository: WorkoutsRepository,
        private readonly usersRepository: UsersRepository,
    ) {}

    async execute(user: UserPayload): Promise<WorkoutModel[]> {
        const userExist = await this.usersRepository.exist(user.id)
        if (!userExist) {
            throw new ConflictException()
        }

        return await this.workoutsRepository.findByAthelte(user.id)
    }
}
