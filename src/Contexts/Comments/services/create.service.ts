import { UsersRepository } from 'src/Contexts/Users/database/users.repository'
import { WorkoutsRepository } from 'src/Contexts/Workouts/database/workouts.repository'
import { UserPayload } from 'src/Core/infrastructure/@types/userPayload'

import { ConflictException, Injectable } from '@nestjs/common'

import { CommentModel } from '../comment.model'
import { CommentsRepository } from '../database/comment.repository'
import { CreateCommentDto } from '../dtos/createComment.dto'

@Injectable()
export class CommentCreateService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly workoutsRepository: WorkoutsRepository,
        private readonly commentsRepository: CommentsRepository,
    ) {}

    async execute(
        user: UserPayload,
        createDto: CreateCommentDto,
    ): Promise<void> {
        const { id, workouId } = createDto

        const userExist = await this.usersRepository.exist(user.id)
        if (!userExist) {
            throw new ConflictException()
        }

        const workoutExist = await this.workoutsRepository.exist(workouId)
        if (!workoutExist) {
            throw new ConflictException()
        }

        const commentExist = await this.commentsRepository.exist(id)
        if (commentExist) {
            throw new ConflictException()
        }

        const newDate = new Date()

        const newComment = new CommentModel({
            ...createDto,
            authorId: user.id,
            createdAt: newDate,
            updatedAt: newDate,
        })

        await this.commentsRepository.save(newComment)
    }
}
