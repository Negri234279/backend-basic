import { ConflictException, Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/Contexts/Users/shared/database/users.repository'
import { PaginationService } from 'src/Core/application/services/pagination.service'
import { PaginationRes } from 'src/Core/infrastructure/@types/pagination'

import { WorkoutsRepository } from '../../shared/database/workouts.repository'
import { WorkoutModel } from '../../shared/workout.model'
import { WorkoutAthleteFiltersWithPaginationDto } from '../dtos/workoutsAthleteFiltersWithPagination.dto'

@Injectable()
export class WorkoutFindByAthleteService {
    constructor(
        private readonly workoutsRepository: WorkoutsRepository,
        private readonly usersRepository: UsersRepository,
        private readonly paginationService: PaginationService,
    ) {}

    async execute(
        athelteId: string,
        { filters, pagination }: WorkoutAthleteFiltersWithPaginationDto,
    ): Promise<PaginationRes<WorkoutModel>> {
        const athlete = await this.usersRepository.findOne(athelteId)
        if (!athlete || !athlete.isAthlete()) {
            throw new ConflictException()
        }

        const workouts = await this.workoutsRepository.findByAthlete(
            filters,
            athelteId,
            athlete.coach as string,
        )

        return this.paginationService.execute<WorkoutModel>(workouts, pagination)
    }
}
