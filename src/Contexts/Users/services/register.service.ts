import { ConflictException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { RegisterDto } from '../dtos'
import { UserRole } from '../userRole'
import { UsersRepository } from '../users.repository'

@Injectable()
export class UserRegisterService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(registerDto: RegisterDto): Promise<void> {
        const { id, username, email, password } = registerDto

        const existUserById = await this.usersRepository.findOne(id)
        if (existUserById) {
            throw new ConflictException()
        }

        const existUserByEmail = await this.usersRepository.findOneByEmail(
            email,
        )
        if (existUserByEmail) {
            throw new ConflictException()
        }

        const existUserByUsername =
            await this.usersRepository.findOneByUsername(username)
        if (existUserByUsername) {
            throw new ConflictException()
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newDate = new Date()
        const user = {
            ...registerDto,
            password: hashedPassword,
            role: [UserRole.ATHLETE],
            createdAt: newDate,
            updatedAt: newDate,
        }

        await this.usersRepository.save(user)
    }
}
