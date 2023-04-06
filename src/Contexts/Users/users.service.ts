import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
    ConflictException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UsersRepository } from './users.repository'
import * as bcrypt from 'bcrypt'
import { LoginDto, RegisterDto } from './dtos'

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService,
    ) {}

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

    async login(loginDto: LoginDto): Promise<{ access_token: string }> {
        const { email, password } = loginDto
        const user = await this.usersRepository.findOneByEmail(email)

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new UnauthorizedException()
        }

        const payload = {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
        }
        const access_token = await this.jwtService.signAsync(payload, {
            expiresIn: '7d',
        })

        return { access_token }
    }

    async profile(id: string): Promise<any> {
        const user = await this.usersRepository.findOne(id)
        if (!user) {
            throw new NotFoundException()
        }

        return user
    }
}
