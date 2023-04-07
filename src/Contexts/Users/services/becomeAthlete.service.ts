import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { UserPayload } from 'src/Core/infrastructure/@types/userPayload'

import { UserRole } from '../userRole'
import { UsersRepository } from '../users.repository'

@Injectable()
export class UserBecomeAthleteService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(id: string): Promise<UserPayload> {
        const user = await this.usersRepository.findOne(id)
        if (!user) {
            throw new NotFoundException()
        }

        if (!user.role.includes(UserRole.COACH)) {
            throw new ConflictException()
        }

        user.role = user.role.filter((role) => role !== UserRole.COACH)

        await this.usersRepository.update(user)

        return {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
        }
    }
}
