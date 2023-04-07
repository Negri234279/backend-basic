import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'

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

        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isMatch) {
            throw new UnauthorizedException()
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        await this.usersRepository.update({ ...user, password: hashedPassword })
    }
}
