import { ConflictException, Injectable } from '@nestjs/common'

import { UsersRepository } from '../database/users.repository'
import { UserModel } from '../user.model'

@Injectable()
export class UserAddCoachRoleService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(id: string): Promise<UserModel> {
        const user = await this.usersRepository.findOne(id)
        if (!user || user.isCoach()) {
            throw new ConflictException()
        }

        user.addCoachRole()

        await this.usersRepository.update(user)

        return user
    }
}
