import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'

import { IUser } from '../user'
import { UserRole } from '../userRole'
import { UsersRepository } from '../users.repository'

@Injectable()
export class UserCoachesListService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(id: string): Promise<IUser[]> {
        const user = await this.usersRepository.findOne(id)
        if (!user) {
            throw new NotFoundException()
        }

        if (!user.role.includes(UserRole.ATHLETE)) {
            throw new ConflictException()
        }

        return await this.usersRepository.findCoaches()
    }
}
