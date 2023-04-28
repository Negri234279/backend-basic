import { ConflictException, Injectable } from '@nestjs/common'

import { UsersRepository } from '../database/users.repository'
import { ChangePasswordDto } from '../dtos'

@Injectable()
export class UserChangePasswordService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(id: string, changePasswordDto: ChangePasswordDto): Promise<void> {
        const { currentPassword, newPassword } = changePasswordDto
        if (currentPassword === newPassword) {
            throw new ConflictException()
        }

        const user = await this.usersRepository.findOne(id)
        if (!user) {
            throw new ConflictException()
        }

        await user.validatePassword(currentPassword)
        await user.changePassword(newPassword)

        await this.usersRepository.update(user)
    }
}
