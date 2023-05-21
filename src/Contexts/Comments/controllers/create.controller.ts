import { Body, Controller, Post, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserModel } from 'src/Contexts/Users/shared/user.model'
import { UserRole } from 'src/Contexts/Users/shared/userRole'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'

import { CommentWithUser } from '../@types/commentWithUser'
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
    ): Promise<CommentWithUser> {
        const comment = await this.commentCreateService.execute(req.user.id, body)

        return this.serializeComment(comment)
    }

    private serializeComment(comment: CommentWithUser): CommentWithUser {
        const author = comment.author as UserModel
        const athleteProfile = author.toAthleteProfile()

        return {
            ...comment,
            author: athleteProfile,
        }
    }
}
