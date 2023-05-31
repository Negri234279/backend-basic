import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { UsersRepository } from 'src/Contexts/Users/shared/database/users.repository'

import { WorkoutsRepository } from '../../shared/database/workouts.repository'
import { WorkoutModel } from '../../shared/workout.model'
import { idWorkoutAndAthleteDto } from '../dtos/idWorkoutAndIdAthlete.dto'
import { UpdateCoachWorkoutDto } from '../dtos/updateWorkout.dto'

@Injectable()
export class WorkoutCoachUpdateService {
    constructor(
        private readonly workoutsRepository: WorkoutsRepository,
        private readonly usersRepository: UsersRepository,
    ) {}

    async execute(
        idCoach: string,
        { idWorkout, idAthlete }: idWorkoutAndAthleteDto,
        updateDto: UpdateCoachWorkoutDto,
    ): Promise<void> {
        const coachExist = await this.usersRepository.exist(idCoach)
        if (!coachExist) {
            new ConflictException()
        }

        const athleteExist = await this.usersRepository.exist(idAthlete)
        if (!athleteExist) {
            new ConflictException()
        }

        const workout = await this.workoutsRepository.findOne(idWorkout)
        if (!workout) {
            throw new NotFoundException()
        }

        if (workout.coach !== idCoach || workout.athlete !== idAthlete) {
            throw new ConflictException()
        }

        const updateWorkout = new WorkoutModel({ ...workout, ...updateDto })

        this.workoutsRepository.update(updateWorkout)
    }
}
