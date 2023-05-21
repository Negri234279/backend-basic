import { Body, Controller, HttpCode, Param, Patch, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserModel } from 'src/Contexts/Users/shared/user.model'
import { UserRole } from 'src/Contexts/Users/shared/userRole'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'
import { IdDto } from 'src/Core/infrastructure/dtos/id.dto'

import { CommentWithUser } from '../@types/commentWithUser'
import { UpdateCommentDto } from '../dtos/updateComment.dto'
import { CommentUpdateService } from '../services/update.service'

@ApiTags('Comments')
@Controller('comments')
export class CommentUpdateController {
    constructor(private readonly commentUpdateService: CommentUpdateService) {}

    @HttpCode(200)
    @Patch(':id')
    @Roles(UserRole.ATHLETE, UserRole.COACH)
    async execute(
        @Req() req: ReqPayload,
        @Param() { id }: IdDto,
        @Body() body: UpdateCommentDto,
    ): Promise<CommentWithUser> {
        const comment = await this.commentUpdateService.execute(req.user.id, id, body)

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
