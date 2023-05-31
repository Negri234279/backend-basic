import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator'

export class CreateCoachWorkoutDto {
    @ApiProperty({ type: 'string', format: 'uuid' })
    @IsUUID()
    @IsNotEmpty()
    readonly id: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    readonly sets: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    readonly reps: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    readonly weight: number

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    readonly date: Date
}
