import { UserRole } from '../userRole'

export interface User extends UserProfile {
    id: string
    password: string
    coach: null | string | UserModel
    athletes?: string[] | UserModel[]
    athleteRequests?: string[] | UserModel[]
}

export interface UserProfile {
    username: string
    email: string
    name: string
    surname: string
    role: UserRole[]
    coach: null | string
    createdAt: Date
    updatedAt: Date
}

export interface AthleteProfile
    extends Pick<UserProfile, 'id' | 'username' | 'name' | 'surname' | 'coach'> {}

export interface CoachProfile extends Pick<UserProfile, 'id' | 'username' | 'name' | 'surname'> {}

export type propertyUserEntity = keyof UserEntity
