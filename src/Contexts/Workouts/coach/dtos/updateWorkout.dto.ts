import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateCoachWorkoutDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly name: string

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    readonly sets: number

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    readonly reps: number

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    readonly weight: number

    @ApiProperty()
    @IsOptional()
    readonly date: Date
}
