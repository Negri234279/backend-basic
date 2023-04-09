import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'

import { UserModel } from '../user.model'
import { UsersRepository } from '../users.repository'

@Injectable()
export class UserCoachesListService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(id: string): Promise<UserModel[]> {
        const user = await this.usersRepository.findOne(id)
        if (!user) {
            throw new NotFoundException()
        }

        if (!user.isAthlete()) {
            throw new ForbiddenException()
        }

        return await this.usersRepository.findCoaches()
    }
}
