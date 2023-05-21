import { CommentCreateService } from './create.service'
import { CommentDeleteService } from './delete.service'
import { CommentFindByWorkoutService } from './findByWorkout.service'
import { CommentFindOneService } from './findOne.service'
import { CommentUpdateService } from './update.service'

export const CommentServices = [
    CommentFindByWorkoutService,
    CommentFindOneService,
    CommentCreateService,
    CommentUpdateService,
    CommentDeleteService,
]
