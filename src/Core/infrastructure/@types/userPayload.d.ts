import { UserRole } from 'src/Contexts/Users/userRole'

export interface UserPayload {
    id: string
    email: string
    username: string
    role: UserRole[]
}

export interface AccessToken {
    access_token: string
}
