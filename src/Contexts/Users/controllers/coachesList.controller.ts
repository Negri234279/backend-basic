import { Controller, Get, Query, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { IPaginatedRes } from 'src/Core/infrastructure/@types/pagination'
import { PaginationDto } from 'src/Core/infrastructure/dtos/pagination.dto'

import { UserCoachesListService } from '../services/coachesList.service'
import { Coach } from '../user'
import { UserModel } from '../user.model'

@ApiTags('Users')
@Controller('users')
export class UserCoachesListController {
    constructor(
        private readonly userCoachesListService: UserCoachesListService,
    ) {}

    @Get('coaches')
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Get list of coaches',
        description:
            'Returns a list of all coaches registered in the system, with their basic information and coach-specific details',
    })
    async execute(
        @Req() req: ReqPayload,
        @Query() pagination: PaginationDto,
    ): Promise<IPaginatedRes<Coach>> {
        const { data, count } = await this.userCoachesListService.execute(
            req.user.id,
            pagination,
        )

        return {
            data: this.serializeCoaches(data),
            count,
            currentPage: pagination.page,
            totalPages: Math.ceil(count / pagination.limit),
        }
    }

    private serializeCoaches(user: UserModel[]): Coach[] {
        return user.map((user: UserModel): Coach => {
            return user.toCoachProfile()
        })
    }
}
