import { ConflictException, Injectable } from '@nestjs/common'

import { UsersRepository } from '../database/users.repository'
import { UserModel } from '../user.model'
import { UserRole } from '../userRole'

@Injectable()
export class UserAddRoleService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(id: string, role: UserRole): Promise<UserModel> {
        const user = await this.usersRepository.findOne(id)
        if (!user) {
            throw new ConflictException()
        }

        user.addRole(role)

        await this.usersRepository.update(user)

        return user
    }
}
