import { ConflictException, Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/Contexts/Users/shared/database/users.repository'
import { WorkoutsRepository } from 'src/Contexts/Workouts/database/workouts.repository'
import { UserPayload } from 'src/Core/infrastructure/@types/userPayload'

import { CommentWithUser } from '../@types/commentWithUser'
import { CommentsRepository } from '../database/comments.repository'

@Injectable()
export class CommentFindByWorkoutService {
    constructor(
        private readonly workoutsRepository: WorkoutsRepository,
        private readonly usersRepository: UsersRepository,
        private readonly CommentRepository: CommentsRepository,
    ) {}

    async execute(user: UserPayload, id: string): Promise<CommentWithUser[]> {
        const userExist = await this.usersRepository.exist(user.id)
        if (!userExist) {
            throw new ConflictException()
        }

        const workoutExist = await this.workoutsRepository.exist(id)
        if (!workoutExist) {
            throw new ConflictException()
        }

        return await this.CommentRepository.findByWorkoutWithUsername(user.id, id)
    }
}
