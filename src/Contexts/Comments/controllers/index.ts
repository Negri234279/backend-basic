import { CommentCreateController } from './create.controller'
import { CommentDeleteController } from './delete.controller'
import { CommentFindByWorkoutController } from './findByWorkout.controller'
import { CommentFindOneController } from './findOnecontroller'

export const CommentControllers = [
    CommentFindByWorkoutController,
    CommentFindOneController,
    CommentCreateController,
    CommentDeleteController,
]
