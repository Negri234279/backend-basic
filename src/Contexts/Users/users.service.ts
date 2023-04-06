import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { UserPayload } from 'src/Core/infrastructure/@types/userPayload'

import { LoginDto, RegisterDto } from './dtos'
import { IUser } from './user'
import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async register(registerDto: RegisterDto): Promise<void> {
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

        const user = {
            ...registerDto,
            password: hashedPassword,
            role: 'athlete',
        }

        await this.usersRepository.save(user)

        return
    }

    async login(loginDto: LoginDto): Promise<UserPayload> {
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

    async profile(id: string): Promise<IUser> {
        const user = await this.usersRepository.findOne(id)
        if (!user) {
            throw new NotFoundException()
        }

        return user
    }
}
