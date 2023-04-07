import { IsNotEmpty, IsString, Length } from 'class-validator'

export class ChangePasswordDto {
    @Length(6, 50)
    @IsString()
    @IsNotEmpty()
    currentPassword: string

    @Length(6, 50)
    @IsString()
    @IsNotEmpty()
    newPassword: string
}
