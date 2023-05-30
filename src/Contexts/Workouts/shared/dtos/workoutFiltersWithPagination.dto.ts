import { IntersectionType } from '@nestjs/mapped-types'
import { PaginationDto } from 'src/Core/infrastructure/dtos/pagination.dto'

import { WorkoutFiltersDto } from './workoutsFilters.dto'

export class WorkoutFiltersWithPaginationDto extends IntersectionType(
    PaginationDto,
    WorkoutFiltersDto,
) {
    constructor(partial: Partial<WorkoutFiltersWithPaginationDto>) {
        super(partial)
        Object.assign(this, partial)
    }

    get filters(): WorkoutFiltersDto {
        return {
            sortBy: this.sortBy,
            startDate: this.startDate,
            endDate: this.endDate,
        }
    }

    get pagination(): PaginationDto {
        return {
            page: this.page,
            limit: this.limit,
        }
    }
}
