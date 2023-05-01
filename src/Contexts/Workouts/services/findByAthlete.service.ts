import { ConflictException, Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/Contexts/Users/shared/database/users.repository'
import { IPaginated } from 'src/Core/infrastructure/@types/pagination'
import { UserPayload } from 'src/Core/infrastructure/@types/userPayload'
import { PaginationDto } from 'src/Core/infrastructure/dtos/pagination.dto'

import { FilterWorkouts } from '../workoutFilters'
import { WorkoutsRepository } from '../database/workouts.repository'
import { WorkoutFilters } from '../dtos/workoutsFilters.dto'
import { WorkoutModel } from '../workout.model'

@Injectable()
export class WorkoutFindByAthleteService {
    constructor(
        private readonly workoutsRepository: WorkoutsRepository,
        private readonly usersRepository: UsersRepository,
    ) {}

    async execute(user: UserPayload, filters: WorkoutFilters): Promise<IPaginated<WorkoutModel>> {
        const { page, limit, filterBy, sortBy } = filters

        const userExist = await this.usersRepository.exist(user.id)
        if (!userExist) {
            throw new ConflictException()
        }

        const workouts = await this.workoutsRepository.findByAthelte(user.id)

        const workoutFiltered = FilterWorkouts.execute(workouts, filterBy)

        const paginatedWorkouts = this.paginate(workoutFiltered, { page, limit })

        return {
            data: paginatedWorkouts,
            count: workoutFiltered.length,
        }
    }

    private paginate(items: WorkoutModel[], pagination: PaginationDto): WorkoutModel[] {
        const { page, limit } = pagination

        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit

        return items.slice(startIndex, endIndex)
    }
}
