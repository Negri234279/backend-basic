import { OmitType, PartialType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional } from 'class-validator'

import { CreateWorkoutDto } from './createWorkout.dto'

export class UpdateworkoutDto extends PartialType(
    OmitType(CreateWorkoutDto, ['id', 'isCompleted', 'isSuccessful']),
) {
    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    isCompleted: boolean

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    isSuccessful: boolean
}
