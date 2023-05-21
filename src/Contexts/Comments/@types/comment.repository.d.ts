import { CommentModel } from '../comment.model'

export interface CommentRepository {
    exist(id: string): Promise<boolean>
    findOne(id: string): Promise<CommentModel | null>
    findByWorkout(author: string, workout: string): Promise<CommentModel[]>
    findOneWithAuthor(id: string): Promise<CommentWithUser | null>
    findByWorkoutWithAuthor(workout: string): Promise<CommentWithUser[]>

    save(comment: CommentModel): Promise<void>
    delete(id: string, author: string): Promise<void>
}
