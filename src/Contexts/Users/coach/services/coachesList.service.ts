import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common'
import { IPaginated } from 'src/Core/infrastructure/@types/pagination'
import { PaginationDto } from 'src/Core/infrastructure/dtos/pagination.dto'

import { UsersRepository } from '../../shared/database/users.repository'
import { UserModel } from '../../shared/user.model'
import { UserRole } from '../../shared/userRole'

@Injectable()
export class UserCoachesListService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(id: string, pagination: PaginationDto): Promise<IPaginated<UserModel>> {
        const user = await this.usersRepository.findOne(id)
        if (!user) {
            throw new ConflictException()
        }

        if (!user.isAthlete()) {
            throw new ForbiddenException()
        }

        return await this.usersRepository.find('role', UserRole.COACH, pagination)
    }
}
