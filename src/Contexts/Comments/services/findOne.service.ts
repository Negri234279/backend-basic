import { ConflictException, Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/Contexts/Users/shared/database/users.repository'

import { CommentWithUser } from '../@types/commentWithUser'
import { CommentsRepository } from '../database/comments.repository'

@Injectable()
export class CommentFindOneService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly commentRepository: CommentsRepository,
    ) {}

    async execute(userId: string, idComment: string): Promise<CommentWithUser> {
        const userExist = await this.usersRepository.exist(userId)
        if (!userExist) {
            throw new ConflictException()
        }

        return await this.commentRepository.findOneWithAuthor(idComment)
    }
}
