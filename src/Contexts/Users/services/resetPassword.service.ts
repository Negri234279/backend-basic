import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common'

import { ResetPasswordDto } from '../dtos'
import { UsersRepository } from '../database/users.repository'

@Injectable()
export class UserResetPasswordService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(id: string, { email }: ResetPasswordDto): Promise<string> {
        const user = await this.usersRepository.findOne(id)
        if (!user) {
            throw new NotFoundException()
        }

        if (user.email !== email) {
            throw new UnauthorizedException()
        }

        const newPassword = await user.randomPassword()

        await this.usersRepository.update(user)

        return newPassword
    }
}
