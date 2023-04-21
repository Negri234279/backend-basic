import { UserModel } from 'src/Contexts/Users/user.model'
import { UserRole } from 'src/Contexts/Users/userRole'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { Roles } from 'src/Core/infrastructure/decorators/roles.decorator'
import { IdDto } from 'src/Core/infrastructure/dtos/id.dto'

import { Controller, Get, Param, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CommentFindByWorkoutService } from '../services/findByWorkout.service'
import { CommentWithUser } from '../@types/commentWithUser'

@ApiTags('Comments')
@Controller('comments')
export class CommentFindByWorkoutController {
    constructor(
        private readonly commentFindByWorkoutService: CommentFindByWorkoutService,
    ) {}

    @Get(':id')
    @Roles(UserRole.ATHLETE, UserRole.COACH)
    async execute(
        @Req() req: ReqPayload,
        @Param() { id }: IdDto,
    ): Promise<CommentWithUser[]> {
        const comments = await this.commentFindByWorkoutService.execute(
            req.user,
            id,
        )

        return comments.map((comment) => {
            const authorId = comment.authorId as UserModel
            authorId.toProfile()

            return {
                ...comment,
                authorId,
            }
        })
    }
}
