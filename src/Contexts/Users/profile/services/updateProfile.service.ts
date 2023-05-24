import { ConflictException, Injectable } from '@nestjs/common'

import { UsersRepository } from '../../shared/database/users.repository'
import { UserModel } from '../../shared/user.model'
import { ProfileUpdateDto } from '../dtos/updateProfile.dto'

@Injectable()
export class UpdateUserProfileService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(id: string, profileDto: ProfileUpdateDto): Promise<UserModel> {
        const user = await this.usersRepository.findOne(id)
        if (!user) {
            throw new ConflictException()
        }

        const updateUser = new UserModel({ ...user, ...profileDto })

        await this.usersRepository.update(updateUser)

        return updateUser
    }
}
