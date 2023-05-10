import { AthleteProfile, CoachProfile } from '../Users/shared/@types/user'
import { UserModel } from '../Users/shared/user.model'
import { Comment } from './@types/comment'

export class CommentModel implements Comment {
    public id: string
    public text: string
    public author: string | UserModel | AthleteProfile | CoachProfile
    public workout: string
    public createdAt: Date
    public updatedAt: Date

    constructor(props: Comment) {
        this.id = props.id
        this.text = props.text
        this.author = props.author
        this.workout = props.workout
        this.createdAt = props.createdAt
        this.updatedAt = props.updatedAt
    }
}
