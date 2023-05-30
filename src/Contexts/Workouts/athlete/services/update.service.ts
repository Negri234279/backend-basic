import { UsersRepository } from 'src/Contexts/Users/shared/database/users.repository'
import { UserPayload } from 'src/Core/infrastructure/@types/userPayload'

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'

import { WorkoutsRepository } from '../../shared/database/workouts.repository'
import { UpdateworkoutDto } from '../dtos/updateWorkout.dto'
import { WorkoutModel } from '../../shared/workout.model'

@Injectable()
export class WorkoutUpdateService {
    constructor(
        private readonly workoutsRepository: WorkoutsRepository,
        private readonly usersRepository: UsersRepository,
    ) {}

    async execute(user: UserPayload, id: string, updateDto: UpdateworkoutDto): Promise<void> {
        const userExist = await this.usersRepository.exist(user.id)
        if (!userExist) {
            new ConflictException()
        }

        const workout = await this.workoutsRepository.findOne(id)
        if (!workout) {
            throw new NotFoundException()
        }

        const updateWorkout = new WorkoutModel({ ...workout, ...updateDto })

        this.workoutsRepository.update(updateWorkout)
    }
}
