import { ConflictException, Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/Contexts/Users/shared/database/users.repository'

import { CommentsRepository } from '../database/comments.repository'

@Injectable()
export class CommentDeleteService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly commentRepository: CommentsRepository,
    ) {}

    async execute(userId: string, commentId: string): Promise<void> {
        const userExist = await this.usersRepository.exist(userId)
        if (!userExist) {
            throw new ConflictException()
        }

        const commentExist = await this.commentRepository.exist(commentId)
        if (!commentExist) {
            throw new ConflictException()
        }

        await this.commentRepository.delete(commentId, userId)
    }
}
