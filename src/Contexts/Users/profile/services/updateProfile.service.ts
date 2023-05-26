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

        if (profileDto.username) {
            const existingUsername = await this.usersRepository.findOneBy(
                'username',
                profileDto.username,
            )
            if (existingUsername && user.username !== profileDto.username) {
                throw new ConflictException('Username already exists')
            }
        }

        if (profileDto.email) {
            const existingEmail = await this.usersRepository.findOneBy('email', profileDto.email)
            if (existingEmail && user.email !== profileDto.email) {
                throw new ConflictException('Email already exists')
            }
        }

        const updateUser = new UserModel({ ...user, ...profileDto })

        await this.usersRepository.update(updateUser)

        return updateUser
    }
}
