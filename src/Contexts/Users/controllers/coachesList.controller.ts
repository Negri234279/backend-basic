import { Controller, Get, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'

import { UserCoachesListService } from '../services/coachesList.service'
import { Coach, IUser } from '../user'

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
    async execute(@Req() req: ReqPayload): Promise<Coach[]> {
        const coaches = await this.userCoachesListService.execute(req.user.id)

        return this.serializeCoaches(coaches)
    }

    private serializeCoaches(user: IUser[]): Coach[] {
        return user.map((user: IUser): Coach => {
            return {
                id: user.id,
                name: user.name,
                surname: user.surname,
                username: user.username,
            }
        })
    }
}
