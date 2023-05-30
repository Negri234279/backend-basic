import { ConflictException, Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/Contexts/Users/shared/database/users.repository'
import { WorkoutsRepository } from 'src/Contexts/Workouts/shared/database/workouts.repository'

import { CommentWithUser } from '../@types/commentWithUser'
import { CommentModel } from '../comment.model'
import { CommentsRepository } from '../database/comments.repository'
import { CreateCommentDto } from '../dtos/createComment.dto'

@Injectable()
export class CommentCreateService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly workoutsRepository: WorkoutsRepository,
        private readonly commentRepository: CommentsRepository,
    ) {}

    async execute(userId: string, createDto: CreateCommentDto): Promise<CommentWithUser> {
        const { id, workout } = createDto

        const userExist = await this.usersRepository.exist(userId)
        if (!userExist) {
            throw new ConflictException()
        }

        const workoutExist = await this.workoutsRepository.exist(workout)
        if (!workoutExist) {
            throw new ConflictException()
        }

        const commentExist = await this.commentRepository.exist(id)
        if (commentExist) {
            throw new ConflictException()
        }

        const newDate = new Date()

        const newComment = new CommentModel({
            ...createDto,
            author: userId,
            createdAt: newDate,
            updatedAt: newDate,
        })

        await this.commentRepository.save(newComment)

        return await this.commentRepository.findOneWithAuthor(id)
    }
}
