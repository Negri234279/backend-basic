import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, IsUUID, Length } from 'class-validator'

export class RegisterDto {
    @ApiProperty({ type: 'string', format: 'uuid' })
    @IsUUID()
    @IsNotEmpty()
    id: string

    @ApiProperty({ type: 'string' })
    @IsString()
    @IsNotEmpty()
    username: string

    @ApiProperty({ type: 'string', format: 'email' })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({ type: 'string', format: 'password' })
    @Length(6, 50)
    @IsString()
    @IsNotEmpty()
    password: string

    @ApiProperty({ type: 'string' })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ type: 'string' })
    @IsString()
    @IsNotEmpty()
    surname: string
}
