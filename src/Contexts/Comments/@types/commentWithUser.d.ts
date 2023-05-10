import { AthleteProfile, CoachProfile } from 'src/Contexts/Users/shared/@types/user'
import { UserModel } from 'src/Contexts/Users/user.model'

import { Comment } from './comment'

export interface CommentWithUser extends Omit<Comment, 'author'> {
    author: UserModel | AthleteProfile | CoachProfile
}
