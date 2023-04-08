import { UserBecomeAthleteService } from './becomeAthlete.service'
import { UserBecomeCoachService } from './becomeCoach.service'
import { UserChangePasswordService } from './changePassword.service'
import { UserCoachesListService } from './coachesList.service'
import { UserLoginService } from './login.service'
import { UserProfileService } from './profile.service'
import { UserRegisterService } from './register.service'
import { UserResetPasswordService } from './resetPassword.service'

export const UserServices = [
    UserLoginService,
    UserRegisterService,
    UserProfileService,
    UserBecomeCoachService,
    UserBecomeAthleteService,
    UserChangePasswordService,
    UserResetPasswordService,
    UserCoachesListService,
]
