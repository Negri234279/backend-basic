import { IsNotEmpty, IsEmail, IsString, IsUUID } from 'class-validator'

export class RegisterDto {
    @IsUUID()
    @IsNotEmpty()
    id: string

    @IsString()
    @IsNotEmpty()
    username: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}
