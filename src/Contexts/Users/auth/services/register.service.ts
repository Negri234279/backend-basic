import { ConflictException, Injectable } from '@nestjs/common'

import { DEFAULT_AVATAR } from '../../shared/constants/defaultAvatar'
import { UsersRepository } from '../../shared/database/users.repository'
import { RegisterDto } from '../../shared/dtos'
import { UserModel } from '../../shared/user.model'
import { UserRole } from '../../shared/userRole'

@Injectable()
export class UserRegisterService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(registerDto: RegisterDto): Promise<void> {
        const { id, username, email, password } = registerDto

        const existUserById = await this.usersRepository.findOne(id)
        if (existUserById) {
            throw new ConflictException()
        }

        const existUserByEmail = await this.usersRepository.findOneBy('email', email)
        if (existUserByEmail) {
            throw new ConflictException()
        }

        const existUserByUsername = await this.usersRepository.findOneBy('username', username)
        if (existUserByUsername) {
            throw new ConflictException()
        }

        const hashedPassword = await UserModel.hashPassword(password)
        const newDate = new Date()

        const user = new UserModel({
            ...registerDto,
            password: hashedPassword,
            role: [UserRole.ATHLETE],
            avatar: DEFAULT_AVATAR,
            coach: null,
            createdAt: newDate,
            updatedAt: newDate,
        })

        await this.usersRepository.save(user)
    }
}
