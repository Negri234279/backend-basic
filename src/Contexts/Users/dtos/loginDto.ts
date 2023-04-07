import { IsNotEmpty, IsEmail, IsString, Length } from 'class-validator'

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @Length(6, 50)
    @IsString()
    @IsNotEmpty()
    password: string
}
