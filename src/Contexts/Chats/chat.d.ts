export interface Chat {
    id: string
    text: string
    from: string | UserModel
    to: string | UserModel
    date: Date
    createdAt: Date
    updatedAt: Date
}
