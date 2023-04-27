import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common'

import { UsersRepository } from '../database/users.repository'
import { UserModel } from '../user.model'

@Injectable()
export class UserRemoveCoachRoleService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(id: string): Promise<UserModel> {
        const user = await this.usersRepository.findOne(id)
        if (!user) {
            throw new ConflictException()
        }

        if (!user.isCoach()) {
            throw new ForbiddenException()
        }

        user.removeCoachRole()

        await this.usersRepository.update(user)

        return user
    }
}
