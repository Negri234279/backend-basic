import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { UsersRepository } from 'src/Contexts/Users/shared/database/users.repository'

import { WorkoutsRepository } from '../../shared/database/workouts.repository'
import { idWorkoutAndAthleteDto } from '../dtos/idWorkoutAndIdAthlete.dto'

@Injectable()
export class WorkoutCoachDeleteService {
    constructor(
        private readonly workoutsRepository: WorkoutsRepository,
        private readonly usersRepository: UsersRepository,
    ) {}

    async execute(
        idCoach: string,
        { idWorkout, idAthlete }: idWorkoutAndAthleteDto,
    ): Promise<void> {
        const coachExist = await this.usersRepository.exist(idCoach)
        if (!coachExist) {
            throw new ConflictException()
        }

        const athlete = await this.usersRepository.findOne(idAthlete)
        if (!athlete || athlete.coach !== idCoach) {
            new ConflictException()
        }

        const workout = await this.workoutsRepository.findOne(idWorkout)
        if (!workout) {
            throw new NotFoundException()
        }

        if (workout.coach !== idCoach || workout.athlete !== idAthlete) {
            throw new ConflictException()
        }

        await this.workoutsRepository.delete(idWorkout)
    }
}
