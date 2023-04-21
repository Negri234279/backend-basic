import { UserRole } from 'src/Contexts/Users/userRole'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'

import { Body, Controller, Post, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CreateCommentDto } from '../dtos/createComment.dto'
import { CommentCreateService } from '../services/create.service'

@ApiTags('Comments')
@Controller('comments')
export class CommentCreateController {
    constructor(private readonly commentCreateService: CommentCreateService) {}

    @Post()
    @Roles(UserRole.ATHLETE, UserRole.COACH)
    async execute(
        @Req() req: ReqPayload,
        @Body() body: CreateCommentDto,
    ): Promise<void> {
        await this.commentCreateService.execute(req.user, body)
    }
}
