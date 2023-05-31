import { ConflictException, Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/Contexts/Users/shared/database/users.repository'

import { WorkoutsRepository } from '../../shared/database/workouts.repository'
import { WorkoutModel } from '../../shared/workout.model'
import { CreateCoachWorkoutDto } from '../dtos/createWorkout.dto'

@Injectable()
export class WorkoutCoachCreateService {
    constructor(
        private readonly workoutsRepository: WorkoutsRepository,
        private readonly usersRepository: UsersRepository,
    ) {}

    async execute(
        idCoach: string,
        idAthlete: string,
        createDto: CreateCoachWorkoutDto,
    ): Promise<void> {
        const coachExist = await this.usersRepository.exist(idCoach)
        if (!coachExist) {
            new ConflictException()
        }

        const athlete = await this.usersRepository.findOne(idAthlete)
        if (!athlete || athlete.coach !== idCoach) {
            new ConflictException()
        }

        const workoutExist = await this.workoutsRepository.exist(createDto.id)
        if (!workoutExist) {
            new ConflictException()
        }

        const newDate = new Date()

        const newWorkout = new WorkoutModel({
            ...createDto,
            isCompleted: false,
            isSuccessful: null,
            athlete: idAthlete,
            coach: idCoach,
            createdAt: newDate,
            updatedAt: newDate,
        })

        await this.workoutsRepository.save(newWorkout)
    }
}
