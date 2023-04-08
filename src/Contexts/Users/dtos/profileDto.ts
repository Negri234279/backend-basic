import { ApiProperty } from '@nestjs/swagger'

import { IUserProfile } from '../user'
import { UserRole } from '../userRole'

export class ProfileDto implements IUserProfile {
    @ApiProperty()
    username: string

    @ApiProperty({ type: 'string', format: 'email' })
    email: string

    @ApiProperty({ enum: UserRole, default: [UserRole.ATHLETE], isArray: true })
    role: UserRole[]
}
