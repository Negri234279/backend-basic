import { ApiProperty } from '@nestjs/swagger'

import { UserRole } from '../userRole'
import { IUserProfile } from '../user'

export class ProfileDto implements IUserProfile {
    @ApiProperty()
    username: string

    @ApiProperty({ type: 'string', format: 'email' })
    email: string

    @ApiProperty({ enum: UserRole, default: [UserRole.ATHLETE], isArray: true })
    role: UserRole[]

    @ApiProperty()
    name: string

    @ApiProperty()
    surname: string

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    updatedAt: Date
}
