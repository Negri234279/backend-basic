import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { IPaginatedRes } from 'src/Core/infrastructure/@types/pagination'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'
import { PaginationDto } from 'src/Core/infrastructure/dtos/pagination.dto'

import { Controller, Get, HttpException, Query, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'

import { UserCoachesListService } from '../services/coachesList.service'
import { CoachProfile } from '../@types/user'
import { UserModel } from '../user.model'
import { UserRole } from '../userRole'

@ApiTags('Users')
@Controller('users')
export class UserCoachesListController {
    constructor(private readonly userCoachesListService: UserCoachesListService) {}

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Get list of coaches',
        description:
            'Returns a list of all coaches registered in the system, with their basic information and coach-specific details',
    })
    @Get('coaches')
    @Roles(UserRole.ATHLETE, UserRole.COACH)
    async execute(
        @Req() req: ReqPayload,
        @Query() pagination: PaginationDto,
    ): Promise<IPaginatedRes<CoachProfile>> {
        const { data, count } = await this.userCoachesListService.execute(req.user.id, pagination)

        if (!data.length) {
            throw new HttpException('No coaches found', 204)
        }

        return {
            data: this.serializeCoaches(data),
            count,
            currentPage: pagination.page,
            totalPages: Math.ceil(count / pagination.limit),
        }
    }

    private serializeCoaches(user: UserModel[]): CoachProfile[] {
        return user.map((user: UserModel): CoachProfile => {
            return user.toCoachProfile()
        })
    }
}
