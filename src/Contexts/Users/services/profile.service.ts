import { Injectable, NotFoundException } from '@nestjs/common'

import { UserModel } from '../user.model'
import { UsersRepository } from '../database/users.repository'

@Injectable()
export class UserProfileService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(id: string): Promise<UserModel> {
        const user = await this.usersRepository.findOne(id)
        if (!user) {
            throw new NotFoundException()
        }

        return user
    }
}
