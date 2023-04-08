import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { UserPayload } from 'src/Core/infrastructure/@types/userPayload'

import { UserRole } from '../userRole'
import { UsersRepository } from '../users.repository'

@Injectable()
export class UserBecomeCoachService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(id: string): Promise<UserPayload> {
        const user = await this.usersRepository.findOne(id)
        if (!user) {
            throw new NotFoundException()
        }

        if (user.role.includes(UserRole.COACH)) {
            throw new ConflictException()
        }

        const role = [...user.role, UserRole.COACH]

        await this.usersRepository.update({ ...user, role })

        return {
            id: user.id,
            email: user.email,
            username: user.username,
            role,
        }
    }
}
