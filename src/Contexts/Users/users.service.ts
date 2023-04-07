import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import {
    AccessToken,
    UserPayload,
} from 'src/Core/infrastructure/@types/userPayload'

import { ChangePasswordDto, LoginDto, RegisterDto } from './dtos'
import { IUser } from './user'
import { UserRole } from './userRole'
import { UsersRepository } from './users.repository'

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
            role: [UserRole.ATHLETE],
        }

        await this.usersRepository.save(user)
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

    async becomeCoach(id: string): Promise<UserPayload> {
        const user = await this.usersRepository.findOne(id)
        if (!user) {
            throw new NotFoundException()
        }

        if (user.role.includes(UserRole.COACH)) {
            throw new ConflictException()
        }

        user.role.push(UserRole.COACH)

        await this.usersRepository.update(user)

        return {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
        }
    }

    async becomeAthlete(id: string): Promise<UserPayload> {
        const user = await this.usersRepository.findOne(id)
        if (!user) {
            throw new NotFoundException()
        }

        if (!user.role.includes(UserRole.COACH)) {
            throw new ConflictException()
        }

        user.role = user.role.filter((role) => role !== UserRole.COACH)

        await this.usersRepository.update(user)

        return {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
        }
    }

    async changePassword(
        id: string,
        changePasswordDto: ChangePasswordDto,
    ): Promise<void> {
        const { currentPassword, newPassword } = changePasswordDto
        if (currentPassword === newPassword) {
            throw new ConflictException()
        }

        const user = await this.usersRepository.findOne(id)
        if (!user) {
            throw new NotFoundException()
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isMatch) {
            throw new UnauthorizedException()
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        await this.usersRepository.update({ ...user, password: hashedPassword })
    }

    async signToken(payload: UserPayload): Promise<AccessToken> {
        const access_token = await this.jwtService.signAsync(payload, {
            expiresIn: '7d',
        })

        return { access_token }
    }
}
