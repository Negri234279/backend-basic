import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'

import { UsersRepository } from '../../shared/database/users.repository'
import { ResetPasswordDto } from '../../shared/dtos'

@Injectable()
export class UserResetPasswordService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(id: string, { email }: ResetPasswordDto): Promise<string> {
        const user = await this.usersRepository.findOne(id)
        if (!user) {
            throw new ConflictException()
        }

        if (user.email !== email) {
            throw new UnauthorizedException()
        }

        const newPassword = await user.randomPassword()

        await this.usersRepository.update(user)

        return newPassword
    }
}
