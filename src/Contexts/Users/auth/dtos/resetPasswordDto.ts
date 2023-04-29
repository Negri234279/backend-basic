import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class ResetPasswordDto {
    @ApiProperty({ type: 'string', format: 'email' })
    @IsEmail()
    @IsNotEmpty()
    email: string
}
