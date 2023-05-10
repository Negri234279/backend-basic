import { UsersRepository } from 'src/Contexts/Users/shared/database/users.repository'
import { WorkoutsRepository } from 'src/Contexts/Workouts/database/workouts.repository'
import { UserPayload } from 'src/Core/infrastructure/@types/userPayload'

import { ConflictException, Injectable } from '@nestjs/common'

import { CommentModel } from '../comment.model'
import { CreateCommentDto } from '../dtos/createComment.dto'
import { CommentsRepository } from '../database/comments.repository'

@Injectable()
export class CommentCreateService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly workoutsRepository: WorkoutsRepository,
        private readonly CommentRepository: CommentsRepository,
    ) {}

    async execute(user: UserPayload, createDto: CreateCommentDto): Promise<void> {
        const { id, workout } = createDto

        const userExist = await this.usersRepository.exist(user.id)
        if (!userExist) {
            throw new ConflictException()
        }

        const workoutExist = await this.workoutsRepository.exist(workout)
        if (!workoutExist) {
            throw new ConflictException()
        }

        const commentExist = await this.CommentRepository.exist(id)
        if (commentExist) {
            throw new ConflictException()
        }

        const newDate = new Date()

        const newComment = new CommentModel({
            ...createDto,
            author: user.id,
            createdAt: newDate,
            updatedAt: newDate,
        })

        await this.CommentRepository.save(newComment)
    }
}
