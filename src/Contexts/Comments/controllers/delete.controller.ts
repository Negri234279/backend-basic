import { Controller, Delete, HttpCode, Param, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserRole } from 'src/Contexts/Users/shared/userRole'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'
import { IdDto } from 'src/Core/infrastructure/dtos/id.dto'

import { CommentDeleteService } from '../services/delete.service'

@ApiTags('Comments')
@Controller('comments')
export class CommentDeleteController {
    constructor(private readonly commentDeleteService: CommentDeleteService) {}

    @HttpCode(204)
    @Delete(':id')
    @Roles(UserRole.ATHLETE, UserRole.COACH)
    async execute(@Req() req: ReqPayload, @Param() { id }: IdDto): Promise<void> {
        await this.commentDeleteService.execute(req.user.id, id)
    }
}
