import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsUUID } from 'class-validator'

import { idAthleteDto } from './idAthlete.dto'

export class idWorkoutAndAthleteDto extends idAthleteDto {
    @ApiProperty({ type: 'string', format: 'uuid' })
    @IsUUID()
    @IsNotEmpty()
    readonly idWorkout: string
}
