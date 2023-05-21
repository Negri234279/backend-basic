import { CommentCreateService } from './create.service'
import { CommentDeleteService } from './delete.service'
import { CommentFindByWorkoutService } from './findByWorkout.service'
import { CommentFindOneService } from './findOne.service'

export const CommentServices = [
    CommentFindByWorkoutService,
    CommentFindOneService,
    CommentCreateService,
    CommentDeleteService,
]
