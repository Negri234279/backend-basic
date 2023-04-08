import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { ResetPasswordDto } from '../dtos'
import { UsersRepository } from '../users.repository'

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

        const newPassword = Math.random().toString(36).slice(-16)
        const hashedPassword = await bcrypt.hash(newPassword, 10)

        await this.usersRepository.update({ ...user, password: hashedPassword })

        return newPassword
    }
}
