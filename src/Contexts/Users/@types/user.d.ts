import { UserRole } from '../userRole'

export interface User extends UserProfile {
    id: string
    password: string
    coach?: string
    athleteRequests?: Array<string>
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

export interface AthleteProfile
    extends Omit<UserProfile, 'email' | 'role' | 'createdAt' | 'updatedAt'> {
    id: string
}

export interface CoachProfile
    extends Omit<UserProfile, 'email' | 'role' | 'createdAt' | 'updatedAt'> {
    id: string
}
