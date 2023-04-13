import { UsersRepository } from 'src/Contexts/Users/database/users.repository'
import { UserPayload } from 'src/Core/infrastructure/@types/userPayload'

import { ConflictException, Injectable } from '@nestjs/common'

import { WorkoutsRepository } from '../database/workouts.repository'
import { UpdateworkoutDto } from '../dtos/updateWorkout.dto'
import { WorkoutModel } from '../workout.model'

@Injectable()
export class WorkoutUpdateService {
    constructor(
        private readonly workoutsRepository: WorkoutsRepository,
        private readonly usersRepository: UsersRepository,
    ) {}

    async execute(
        user: UserPayload,
        id: string,
        updateDto: UpdateworkoutDto,
    ): Promise<any> {
        const userExist = await this.usersRepository.exist(user.id)
        if (!userExist) {
            throw new ConflictException()
        }

        const workout = await this.workoutsRepository.findOne(id)
        if (!workout) {
            throw new ConflictException()
        }

        const updateWorkout = new WorkoutModel({ ...workout, ...updateDto })

        this.workoutsRepository.update(updateWorkout)
    }
}
