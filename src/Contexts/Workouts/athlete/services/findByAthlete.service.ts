import { ConflictException, Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/Contexts/Users/shared/database/users.repository'
import { PaginationService } from 'src/Core/application/services/pagination.service'
import { PaginationRes } from 'src/Core/infrastructure/@types/pagination'
import { UserPayload } from 'src/Core/infrastructure/@types/userPayload'

import { WorkoutsRepository } from '../../shared/database/workouts.repository'
import { WorkoutFilters } from '../dtos/workoutsFilters.dto'
import { WorkoutModel } from '../../shared/workout.model'
import { FilterWorkoutsService } from './filterWorkouts.service'
import { SortWorkoutsService } from './sortWorkout.service'

@Injectable()
export class WorkoutFindByAthleteService {
    constructor(
        private readonly workoutsRepository: WorkoutsRepository,
        private readonly usersRepository: UsersRepository,
        private readonly filterWorkoutsService: FilterWorkoutsService,
        private readonly sortWorkoutsService: SortWorkoutsService,
        private readonly paginationService: PaginationService,
    ) {}

    async execute(
        user: UserPayload,
        filters: WorkoutFilters,
    ): Promise<PaginationRes<WorkoutModel>> {
        const { filterBy, sortBy, ...pagination } = filters

        const userExist = await this.usersRepository.exist(user.id)
        if (!userExist) {
            throw new ConflictException()
        }

        const workouts = await this.workoutsRepository.findByAthelte(user.id)

        const workoutsFiltered = this.filterWorkoutsService.execute(workouts, filterBy)
        const workoutsSorted = this.sortWorkoutsService.execute(workoutsFiltered, sortBy)

        return this.paginationService.execute<WorkoutModel>(
            workoutsSorted,
            pagination,
            workoutsFiltered.length,
        )
    }
}