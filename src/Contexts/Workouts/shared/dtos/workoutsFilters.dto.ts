import { Type } from 'class-transformer'
import { IsDate, IsEnum, IsOptional } from 'class-validator'

import { WORKOUT_SORT_BY } from '../@types/workoutSort.enum'

export class WorkoutFiltersDto {
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
}
