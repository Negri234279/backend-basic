import { AthleteProfile, CoachProfile } from 'src/Contexts/Users/@types/user'
import { UserModel } from 'src/Contexts/Users/user.model'

export interface Comment {
    id: string
    text: string
    author: string | UserModel | AthleteProfile | CoachProfile
    workout: string
    createdAt: Date
    updatedAt: Date
}
