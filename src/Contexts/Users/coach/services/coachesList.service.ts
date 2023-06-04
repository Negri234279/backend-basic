import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common'
import { PaginationService } from 'src/Core/application/services/pagination.service'
import { PaginationRes } from 'src/Core/infrastructure/@types/pagination'

import { UsersRepository } from '../../shared/database/users.repository'
import { SearchWithPaginationDto } from '../../shared/dtos/searchWithPagination.dto'
import { UserModel } from '../../shared/user.model'
import { UserRole } from '../../shared/userRole'

@Injectable()
export class UserCoachesListService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly paginationService: PaginationService,
    ) {}

    async execute(
        id: string,
        { search, ...pagination }: SearchWithPaginationDto,
    ): Promise<PaginationRes<UserModel>> {
        const user = await this.usersRepository.findOne(id)
        if (!user) {
            throw new ConflictException()
        }

        if (!user.isAthlete()) {
            throw new ForbiddenException()
        }

        const coaches = await this.usersRepository.find('role', UserRole.COACH, search)

        return this.paginationService.execute<UserModel>(coaches, pagination)
    }
}
