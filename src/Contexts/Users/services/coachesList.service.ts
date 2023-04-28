import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common'
import { IPaginated } from 'src/Core/infrastructure/@types/pagination'
import { PaginationDto } from 'src/Core/infrastructure/dtos/pagination.dto'

import { UsersRepository } from '../database/users.repository'
import { UserModel } from '../user.model'

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

        const data = await this.usersRepository.findCoaches(pagination)
        const count = await this.usersRepository.countCoaches()

        return { data, count }
    }
}
