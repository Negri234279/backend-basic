import { Transform, Type } from 'class-transformer'
import { IsBoolean, IsBooleanString, IsDate, IsEnum, IsOptional } from 'class-validator'

import { WORKOUT_SORT_BY } from '../../shared/@types/workoutSort.enum'

export class WorkoutAthleteFiltersDto {
    @IsOptional()
    @IsEnum(WORKOUT_SORT_BY)
    @Type(() => Number)
    readonly sortBy: WORKOUT_SORT_BY = WORKOUT_SORT_BY.DEFAULT

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly startDate: Date

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly endDate: Date

    @IsOptional()
    @Transform(({ value }) => value === 'true')
    readonly athlete: boolean = false

    @IsOptional()
    @Transform(({ value }) => value === 'true')
    readonly coach: boolean = false
}
