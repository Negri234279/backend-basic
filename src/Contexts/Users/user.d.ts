export interface IUser {
    id: string
    username: string
    password: string
    email: string
    name: string
    surname: string
    role: UserRole[]
    coach?: string
    createdAt: Date
    updatedAt: Date
}

export type IUserProfile = Omit<IUser, 'id' | 'password' | 'coach'>
