import { UsersRepository } from 'src/Contexts/Users/database/users.repository'
import { WorkoutsRepository } from 'src/Contexts/Workouts/database/workouts.repository'
import { UserPayload } from 'src/Core/infrastructure/@types/userPayload'

import { ConflictException, Injectable } from '@nestjs/common'

import { CommentModel } from '../comment.model'
import { CommentsRepository } from '../database/comment.repository'

@Injectable()
export class CommentFindByWorkoutService {
    constructor(
        private readonly workoutsRepository: WorkoutsRepository,
        private readonly usersRepository: UsersRepository,
        private readonly commentsRepository: CommentsRepository,
    ) {}

    async execute(user: UserPayload, id: string): Promise<CommentModel[]> {
        const userExist = await this.usersRepository.exist(user.id)
        if (!userExist) {
            throw new ConflictException()
        }

        return await this.commentsRepository.findByWorkoutWithUsername(
            user.id,
            id,
        )
    }
}
