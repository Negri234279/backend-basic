export interface IUser {
    id: string
    username: string
    password: string
    email: string
    role: string
}

export type IUserProfile = Omit<IUser, 'id' | 'password'>
