import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { UserPayload } from 'src/Core/infrastructure/@types/userPayload'

import { UsersService } from '../users.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({ usernameField: 'email' })
    }

    async validate(email: string, password: string): Promise<UserPayload> {
        return await this.usersService.login({ email, password })
    }
}
