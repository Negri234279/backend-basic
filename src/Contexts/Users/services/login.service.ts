import { ConflictException, Injectable } from '@nestjs/common'

import { LoginDto } from '../dtos'
import { UserModel } from '../user.model'
import { UsersRepository } from '../users.repository'

@Injectable()
export class UserLoginService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(loginDto: LoginDto): Promise<UserModel> {
        const { email, password } = loginDto

        const user = await this.usersRepository.findOneByEmail(email)
        if (!user) {
            throw new ConflictException()
        }

        await user.validatePassword(password)

        return user
    }
}
