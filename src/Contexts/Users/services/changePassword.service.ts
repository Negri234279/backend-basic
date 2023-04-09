import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'

import { ChangePasswordDto } from '../dtos'
import { UsersRepository } from '../users.repository'

@Injectable()
export class UserChangePasswordService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(
        id: string,
        changePasswordDto: ChangePasswordDto,
    ): Promise<void> {
        const { currentPassword, newPassword } = changePasswordDto
        if (currentPassword === newPassword) {
            throw new ConflictException()
        }

        const user = await this.usersRepository.findOne(id)
        if (!user) {
            throw new NotFoundException()
        }

        await user.validatePassword(currentPassword)
        await user.changePassword(newPassword)

        await this.usersRepository.update(user)
    }
}
