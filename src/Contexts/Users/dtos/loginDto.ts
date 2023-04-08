import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsEmail, IsString, Length } from 'class-validator'

export class LoginDto {
    @ApiProperty({ type: 'string', format: 'email' })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({ type: 'string', format: 'password' })
    @Length(6, 50)
    @IsString()
    @IsNotEmpty()
    password: string
}
