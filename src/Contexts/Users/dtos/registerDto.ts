import { IsNotEmpty, IsEmail, IsString, IsUUID, Length } from 'class-validator'

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

    @Length(6, 50)
    @IsString()
    @IsNotEmpty()
    password: string
}
