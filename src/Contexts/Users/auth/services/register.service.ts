import { ConflictException, Injectable } from '@nestjs/common'

import { RegisterDto } from '../../shared/dtos'
import { UserModel } from '../../shared/user.model'
import { UsersRepository } from '../../shared/database/users.repository'

@Injectable()
export class UserRegisterService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(registerDto: RegisterDto): Promise<void> {
        const { id, username, email, password } = registerDto

        const existUserById = await this.usersRepository.findOne(id)
        if (existUserById) {
            throw new ConflictException()
        }

        const existUserByEmail = await this.usersRepository.findOneByEmail(email)
        if (existUserByEmail) {
            throw new ConflictException()
        }

        const existUserByUsername = await this.usersRepository.findOneByUsername(username)
        if (existUserByUsername) {
            throw new ConflictException()
        }

        const hashedPassword = await UserModel.hashPassword(password)

        const user = UserModel.create({
            ...registerDto,
            password: hashedPassword,
        })

        await this.usersRepository.save(user)
    }
}
