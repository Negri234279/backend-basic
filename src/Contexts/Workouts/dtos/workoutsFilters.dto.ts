import { Type } from 'class-transformer'
import { IsEnum, IsOptional } from 'class-validator'
import { PaginationDto } from 'src/Core/infrastructure/dtos/pagination.dto'

import { WORKOUT_FILTERS_BY } from '../services/filterWorkouts.service'
import { WORKOUT_SORT_BY } from '../services/sortWorkout.service'

export class WorkoutFilters extends PaginationDto {
    @IsOptional()
    @IsEnum(WORKOUT_FILTERS_BY)
    @Type(() => Number)
    filterBy: WORKOUT_FILTERS_BY = WORKOUT_FILTERS_BY.DEFAULT

    @IsOptional()
    @IsEnum(WORKOUT_SORT_BY)
    @Type(() => Number)
    sortBy: WORKOUT_SORT_BY = WORKOUT_SORT_BY.DEFAULT
}
