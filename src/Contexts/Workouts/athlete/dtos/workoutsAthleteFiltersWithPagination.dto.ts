import { IntersectionType } from '@nestjs/mapped-types'
import { PaginationDto } from 'src/Core/infrastructure/dtos/pagination.dto'

import { WorkoutAthleteFiltersDto } from './workoutsAthleteFilters.dto'

export class WorkoutAthleteFiltersWithPaginationDto extends IntersectionType(
    PaginationDto,
    WorkoutAthleteFiltersDto,
) {
    constructor(partial: Partial<WorkoutAthleteFiltersWithPaginationDto>) {
        super(partial)
        Object.assign(this, partial)
    }

    get filters(): WorkoutAthleteFiltersDto {
        return {
            sortBy: this.sortBy,
            startDate: this.startDate,
            endDate: this.endDate,
            athlete: this.athlete,
            coach: this.coach,
        }
    }

    get pagination(): PaginationDto {
        return {
            page: this.page,
            limit: this.limit,
        }
    }
}
