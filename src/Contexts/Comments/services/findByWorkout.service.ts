import { ConflictException, Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/Contexts/Users/shared/database/users.repository'
import { WorkoutsRepository } from 'src/Contexts/Workouts/shared/database/workouts.repository'
import { UserPayload } from 'src/Core/infrastructure/@types/userPayload'

import { CommentWithUser } from '../@types/commentWithUser'
import { CommentsRepository } from '../database/comments.repository'

@Injectable()
export class CommentFindByWorkoutService {
    constructor(
        private readonly workoutsRepository: WorkoutsRepository,
        private readonly usersRepository: UsersRepository,
        private readonly commentRepository: CommentsRepository,
    ) {}

    async execute(user: UserPayload, idWorkout: string): Promise<CommentWithUser[]> {
        const userExist = await this.usersRepository.exist(user.id)
        if (!userExist) {
            throw new ConflictException()
        }

        const workoutExist = await this.workoutsRepository.exist(idWorkout)
        if (!workoutExist) {
            throw new ConflictException()
        }

        return await this.commentRepository.findByWorkoutWithAuthor(idWorkout)
    }
}
