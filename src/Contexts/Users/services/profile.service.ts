import { Injectable, NotFoundException } from '@nestjs/common'

import { IUser } from '../user'
import { UsersRepository } from '../users.repository'

@Injectable()
export class UserProfileService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(id: string): Promise<IUser> {
        const user = await this.usersRepository.findOne(id)
        if (!user) {
            throw new NotFoundException()
        }

        return user
    }
}
