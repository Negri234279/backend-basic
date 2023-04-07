import { BadRequestException, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { UserPayload } from 'src/Core/infrastructure/@types/userPayload'

import { UsersService } from '../users.service'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { LoginDto } from '../dtos'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({ usernameField: 'email' })
    }

    async validate(email: string, password: string): Promise<UserPayload> {
        const credentials = { email, password }
        const loginDto = plainToClass(LoginDto, credentials)
        const errors = await validate(loginDto)

        if (errors.length) {
            const message = errors
                .map(({ constraints }) => Object.values(constraints))
                .flat()

            throw new BadRequestException({
                statusCode: 400,
                message,
                error: 'Bad Request',
            })
        }

        return await this.usersService.login(credentials)
    }
}
