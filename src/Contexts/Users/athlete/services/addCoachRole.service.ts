import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common'

import { UsersRepository } from '../../shared/database/users.repository'
import { UserModel } from '../../shared/user.model'

@Injectable()
export class UserAddCoachRoleService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(id: string): Promise<UserModel> {
        const user = await this.usersRepository.findOne(id)
        if (!user || user.isCoach()) {
            throw new ConflictException()
        }

        if (!user.isAthlete()) {
            throw new ForbiddenException()
        }

        user.addCoachRole()

        await this.usersRepository.update(user)

        return user
    }
}
