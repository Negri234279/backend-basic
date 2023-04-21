export interface IComment {
    id: string
    text: string
    authorId: string | UserModel
    workouId: string
    createdAt: Date
    updatedAt: Date
}
