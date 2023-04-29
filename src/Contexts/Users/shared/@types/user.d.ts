import { UserRole } from '../userRole'

export interface User extends UserProfile {
    id: string
    password: string
    coach?: string
    athletes?: string[]
    athleteRequests?: string[]
}

export interface UserProfile {
    username: string
    email: string
    name: string
    surname: string
    role: UserRole[]
    createdAt: Date
    updatedAt: Date
}

export interface AthleteProfile extends Pick<UserProfile, 'id' | 'username' | 'name' | 'surname'> {}

export interface CoachProfile extends Pick<UserProfile, 'id' | 'username' | 'name' | 'surname'> {}
