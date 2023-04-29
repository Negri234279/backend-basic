import { UserRole } from 'src/Contexts/Users/shared/userRole'

export type UserPayload = {
    id: string
    email: string
    username: string
    role: UserRole[]
}

export type AccessToken = {
    access_token: string
}
