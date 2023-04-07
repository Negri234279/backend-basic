import { UserBecomeAthleteService } from './becomeAthlete.service'
import { UserBecomeCoachService } from './becomeCoach.service'
import { UserChangePasswordService } from './changePassword.service'
import { UserLoginService } from './login.service'
import { UserProfileService } from './profile.service'
import { UserRegisterService } from './register.service'

export const UserServices = [
    UserLoginService,
    UserRegisterService,
    UserProfileService,
    UserBecomeCoachService,
    UserBecomeAthleteService,
    UserChangePasswordService,
]
