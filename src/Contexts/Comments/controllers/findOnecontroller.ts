import { Controller, Get, Param, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserModel } from 'src/Contexts/Users/shared/user.model'
import { UserRole } from 'src/Contexts/Users/shared/userRole'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'
import { IdDto } from 'src/Core/infrastructure/dtos/id.dto'

import { CommentWithUser } from '../@types/commentWithUser'
import { CommentFindOneService } from '../services/findOne.service'

@ApiTags('Comments')
@Controller('comments')
export class CommentFindOneController {
    constructor(private readonly commentFindOneService: CommentFindOneService) {}

    @Get(':id')
    @Roles(UserRole.ATHLETE, UserRole.COACH)
    async execute(@Req() req: ReqPayload, @Param() { id }: IdDto): Promise<CommentWithUser> {
        const comment = await this.commentFindOneService.execute(req.user.id, id)

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
