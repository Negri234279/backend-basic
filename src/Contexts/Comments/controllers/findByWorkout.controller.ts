import { Controller, Get, Param, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserModel } from 'src/Contexts/Users/shared/user.model'
import { UserRole } from 'src/Contexts/Users/shared/userRole'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'
import { IdDto } from 'src/Core/infrastructure/dtos/id.dto'

import { CommentWithUser } from '../@types/commentWithUser'
import { CommentFindByWorkoutService } from '../services/findByWorkout.service'

@ApiTags('Comments')
@Controller()
export class CommentFindByWorkoutController {
    constructor(private readonly commentFindByWorkoutService: CommentFindByWorkoutService) {}

    @Get(':id/comments')
    @Roles(UserRole.ATHLETE, UserRole.COACH)
    async execute(@Req() req: ReqPayload, @Param() { id }: IdDto): Promise<CommentWithUser[]> {
        const comments = await this.commentFindByWorkoutService.execute(req.user, id)

        return this.serializeComments(comments)
    }

    private serializeComments(comments: CommentWithUser[]): CommentWithUser[] {
        return comments.map((comment) => {
            const author = comment.author as UserModel
            const athleteProfile = author.toAthleteProfile()

            return {
                ...comment,
                author: athleteProfile,
            }
        })
    }
}
