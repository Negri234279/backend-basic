import { ConflictException, Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/Contexts/Users/shared/database/users.repository'
import { PaginationService } from 'src/Core/application/services/pagination.service'
import { PaginationRes } from 'src/Core/infrastructure/@types/pagination'

import { WorkoutsRepository } from '../../shared/database/workouts.repository'
import { WorkoutModel } from '../../shared/workout.model'
import { WorkoutFiltersWithPaginationDto } from '../../shared/dtos/workoutFiltersWithPagination.dto'

@Injectable()
export class WorkoutFindByCoachAthleteService {
    constructor(
        private readonly workoutsRepository: WorkoutsRepository,
        private readonly usersRepository: UsersRepository,
        private readonly paginationService: PaginationService,
    ) {}

    async execute(
        athelteId: string,
        coachId: string,
        { filters, pagination }: WorkoutFiltersWithPaginationDto,
    ): Promise<PaginationRes<WorkoutModel>> {
        const athelte = await this.usersRepository.findOne(athelteId)
        if (!athelte) {
            throw new ConflictException()
        }

        const coach = await this.usersRepository.findOne(coachId)
        if (!coach || coach.id !== coachId) {
            throw new ConflictException()
        }

        const workouts = await this.workoutsRepository.find(athelteId, coachId, filters)

        return this.paginationService.execute<WorkoutModel>(workouts, pagination)
    }
}
