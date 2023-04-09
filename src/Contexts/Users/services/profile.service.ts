import { ConflictException, Injectable } from '@nestjs/common'

import { UsersRepository } from '../database/users.repository'
import { UserModel } from '../user.model'

@Injectable()
export class UserProfileService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(id: string): Promise<UserModel> {
        const user = await this.usersRepository.findOne(id)
        if (!user) {
            throw new ConflictException()
        }

        return user
    }
}
