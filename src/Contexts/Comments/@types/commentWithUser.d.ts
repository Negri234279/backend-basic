import { IUserProfile } from 'src/Contexts/Users/user'
import { IComment } from './comment'

export interface CommentWithUser extends Omit<IComment, 'authorId'> {
    authorId: IUserProfile
}
