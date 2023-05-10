import { Injectable } from '@nestjs/common'
import { PaginationRes } from 'src/Core/infrastructure/@types/pagination'
import { PaginationDto } from 'src/Core/infrastructure/dtos/pagination.dto'

@Injectable()
export class PaginationService {
    async execute<TModel>(
        items: TModel[],
        pagination: PaginationDto,
        total: number,
    ): Promise<PaginationRes<TModel>> {
        const data = this.paginate<TModel>(items, pagination)
        const count = total

        return {
            data,
            count,
            currentPage: pagination.page,
            totalPages: Math.ceil(count / pagination.limit),
        }
    }

    private paginate<TModel>(items: TModel[], pagination: PaginationDto): TModel[] {
        const { page, limit } = pagination

        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit

        return items.slice(startIndex, endIndex)
    }
}
