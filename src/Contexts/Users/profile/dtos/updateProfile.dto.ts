import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString } from 'class-validator'

export class ProfileUpdateDto {
    @ApiProperty({ type: 'string' })
    @IsString()
    @IsOptional()
    username: string

    @ApiProperty({ type: 'string', format: 'email' })
    @IsEmail()
    @IsOptional()
    email: string

    @ApiProperty({ type: 'string' })
    @IsString()
    @IsOptional()
    name: string

    @ApiProperty({ type: 'string' })
    @IsString()
    @IsOptional()
    surname: string
}
