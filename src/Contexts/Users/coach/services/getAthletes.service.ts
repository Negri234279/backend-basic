import { Injectable, NotFoundException } from '@nestjs/common'
import { PaginationService } from 'src/Core/application/services/pagination.service'
import { PaginationRes } from 'src/Core/infrastructure/@types/pagination'

import { UsersRepository } from '../../shared/database/users.repository'
import { SearchWithPaginationDto } from '../../shared/dtos/searchWithPagination.dto'
import { UserModel } from '../../shared/user.model'

@Injectable()
export class UserCoachGetAthletesService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly paginationService: PaginationService,
    ) {}

    async execute(
        idCoach: string,
        { search, ...pagination }: SearchWithPaginationDto,
    ): Promise<PaginationRes<UserModel>> {
        const coach = await this.usersRepository.findOne(idCoach, { populateAthletes: true })
        if (!coach || !coach.isCoach()) {
            throw new NotFoundException()
        }

        let athletes = coach.athletes as UserModel[]

        if (search) {
            athletes = athletes.filter((athlete) => {
                const name = athlete.name.toLowerCase()
                const username = athlete.username.toLowerCase()
                const searchLower = search.toLowerCase()

                return name.includes(searchLower) || username.includes(searchLower)
            })
        }

        return this.paginationService.execute<UserModel>(athletes, pagination)
    }
}
