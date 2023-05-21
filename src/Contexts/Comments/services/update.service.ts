import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { UsersRepository } from 'src/Contexts/Users/shared/database/users.repository'

import { CommentsRepository } from '../database/comments.repository'
import { UpdateCommentDto } from '../dtos/updateComment.dto'
import { CommentModel } from '../comment.model'

@Injectable()
export class CommentUpdateService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly commentRepository: CommentsRepository,
    ) {}

    async execute(
        userId: string,
        commentId: string,
        commentDto: UpdateCommentDto,
    ): Promise<CommentModel> {
        const userExist = await this.usersRepository.exist(userId)
        if (!userExist) {
            throw new ConflictException()
        }

        const comment = await this.commentRepository.findOne(commentId)
        if (!comment) {
            throw new NotFoundException()
        }

        await this.commentRepository.update({ ...comment, ...commentDto })

        return await this.commentRepository.findOneWithAuthor(commentId)
    }
}
