import {
    IsBoolean,
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class CreateWorkoutDto {
    @ApiProperty({ type: 'string', format: 'uuid' })
    @IsUUID()
    @IsNotEmpty()
    id: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    sets: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    reps: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    weight: number

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    date: Date

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    isCompleted?: boolean

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    isSuccessful?: boolean

    @ApiProperty({ type: 'string', format: 'uuid' })
    @IsUUID()
    @IsNotEmpty()
    athlete: string

    @ApiProperty({ type: 'string', format: 'uuid' })
    @IsUUID()
    @IsOptional()
    coach?: string
}
