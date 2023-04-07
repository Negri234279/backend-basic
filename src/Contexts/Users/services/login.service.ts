import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { UserPayload } from 'src/Core/infrastructure/@types/userPayload'

import { LoginDto } from '../dtos'
import { UsersRepository } from '../users.repository'

@Injectable()
export class UserLoginService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(loginDto: LoginDto): Promise<UserPayload> {
        const { email, password } = loginDto

        const user = await this.usersRepository.findOneByEmail(email)
        if (!user) {
            throw new ConflictException()
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new UnauthorizedException()
        }

        return {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
        }
    }
}
