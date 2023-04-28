import { ApiProperty } from '@nestjs/swagger'

import { UserRole } from '../userRole'

export class ProfileDto {
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
