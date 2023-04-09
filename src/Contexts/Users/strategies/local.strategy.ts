import { BadRequestException, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { Strategy } from 'passport-local'
import { UserPayload } from 'src/Core/infrastructure/@types/userPayload'

import { LoginDto } from '../dtos'
import { UserLoginService } from '../services/login.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userLoginService: UserLoginService) {
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

        const user = await this.userLoginService.execute(credentials)

        return user.toPayload()
    }
}
