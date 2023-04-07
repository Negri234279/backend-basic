import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import {
    AccessToken,
    UserPayload,
} from 'src/Core/infrastructure/@types/userPayload'

@Injectable()
export class JwtProvider {
    constructor(private readonly jwtService: JwtService) {}

    async signToken(payload: UserPayload): Promise<AccessToken> {
        const access_token = await this.jwtService.signAsync(payload, {
            expiresIn: '7d',
        })

        return { access_token }
    }
}
