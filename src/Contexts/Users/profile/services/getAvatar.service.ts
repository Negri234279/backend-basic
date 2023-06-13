import { Injectable, NotFoundException } from '@nestjs/common'

import { UsersRepository } from '../../shared/database/users.repository'
import { UserModel } from '../../shared/user.model'

@Injectable()
export class GetAvatarService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(username: string): Promise<UserModel> {
        const user = await this.usersRepository.findOneBy('username', username)
        if (!user || !user.avatar) {
            throw new NotFoundException()
        }

        return user
    }
}
