import { ApiProperty } from '@nestjs/swagger'
import { AccessToken } from 'src/Core/infrastructure/@types/userPayload'

export class AccessTokenDto implements AccessToken {
    @ApiProperty()
    access_token: string
}
