import { CommentCreateController } from './create.controller'
import { CommentDeleteController } from './delete.controller'
import { CommentFindByWorkoutController } from './findByWorkout.controller'
import { CommentFindOneController } from './findOnecontroller'
import { CommentUpdateController } from './update.controller'

export const CommentControllers = [
    CommentFindByWorkoutController,
    CommentFindOneController,
    CommentCreateController,
    CommentUpdateController,
    CommentDeleteController,
]
