import { ConflictException, Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/Contexts/Users/shared/database/users.repository'
import { PaginationService } from 'src/Core/application/services/pagination.service'
import { PaginationRes } from 'src/Core/infrastructure/@types/pagination'

import { WorkoutsRepository } from '../../shared/database/workouts.repository'
import { WorkoutModel } from '../../shared/workout.model'
import { WorkoutFiltersWithPaginationDto } from '../../shared/dtos/workoutFiltersWithPagination.dto'

@Injectable()
export class WorkoutFindByAthleteService {
    constructor(
        private readonly workoutsRepository: WorkoutsRepository,
        private readonly usersRepository: UsersRepository,
        private readonly paginationService: PaginationService,
    ) {}

    async execute(
        athelteId: string,
        { filters, pagination }: WorkoutFiltersWithPaginationDto,
    ): Promise<PaginationRes<WorkoutModel>> {
        const userExist = await this.usersRepository.exist(athelteId)
        if (!userExist) {
            throw new ConflictException()
        }

        const workouts = await this.workoutsRepository.find(athelteId, undefined, filters)

        return this.paginationService.execute<WorkoutModel>(workouts, pagination)
    }
}
