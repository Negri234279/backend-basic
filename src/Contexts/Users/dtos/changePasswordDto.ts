import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class ChangePasswordDto {
    @ApiProperty({ type: 'string', format: 'password' })
    @Length(6, 50)
    @IsString()
    @IsNotEmpty()
    currentPassword: string

    @ApiProperty({ type: 'string', format: 'password' })
    @Length(6, 50)
    @IsString()
    @IsNotEmpty()
    newPassword: string
}
