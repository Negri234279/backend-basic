import { Injectable, NotFoundException } from '@nestjs/common'
import { PaginationService } from 'src/Core/application/services/pagination.service'
import { PaginationRes } from 'src/Core/infrastructure/@types/pagination'
import { PaginationDto } from 'src/Core/infrastructure/dtos/pagination.dto'

import { UsersRepository } from '../../shared/database/users.repository'
import { UserModel } from '../../shared/user.model'

@Injectable()
export class UserCoachGetAthleteRequestsService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly paginationService: PaginationService,
    ) {}

    async execute(idCoach: string, pagination: PaginationDto): Promise<PaginationRes<UserModel>> {
        const coach = await this.usersRepository.findOne(idCoach, { populateRequestAthletes: true })
        if (!coach || !coach.isCoach()) {
            throw new NotFoundException()
        }

        const athletes = coach.athleteRequests as UserModel[]

        return this.paginationService.execute<UserModel>(athletes, pagination)
    }
}
