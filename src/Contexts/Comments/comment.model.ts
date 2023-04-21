import { IUserProfile } from '../Users/user'
import { UserModel } from '../Users/user.model'
import { IComment } from './@types/comment'

export class CommentModel {
    public id: string
    public text: string
    public authorId: string | UserModel | IUserProfile
    public workouId: string
    public createdAt: Date
    public updatedAt: Date

    constructor(props: IComment) {
        this.id = props.id
        this.text = props.text
        this.authorId = props.authorId
        this.workouId = props.workouId
        this.createdAt = props.createdAt
        this.updatedAt = props.updatedAt
    }
}
