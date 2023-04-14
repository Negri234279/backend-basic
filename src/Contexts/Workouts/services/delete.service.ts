import { UsersRepository } from 'src/Contexts/Users/database/users.repository'
import { UserPayload } from 'src/Core/infrastructure/@types/userPayload'

import { ConflictException, Injectable } from '@nestjs/common'

import { WorkoutsRepository } from '../database/workouts.repository'

@Injectable()
export class WorkoutDeleteService {
    constructor(
        private readonly workoutsRepository: WorkoutsRepository,
        private readonly usersRepository: UsersRepository,
    ) {}

    async execute(user: UserPayload, id: string): Promise<void> {
        const userExist = await this.usersRepository.exist(user.id)
        if (!userExist) {
            throw new ConflictException()
        }

        const workoutExist = await this.workoutsRepository.exist(id)
        if (!workoutExist) {
            throw new ConflictException()
        }

        await this.workoutsRepository.delete(id)
    }
}
