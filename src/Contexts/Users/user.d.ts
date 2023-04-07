export interface IUser {
    id: string
    username: string
    password: string
    email: string
    role: UserRole[]
}

export type IUserProfile = Omit<IUser, 'id' | 'password'>
