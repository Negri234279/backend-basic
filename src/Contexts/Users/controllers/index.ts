import { UserBecomeAthleteController } from './becomeAthlete.controller'
import { UserBecomeCoachController } from './becomeCoach.controller'
import { UserChangePasswordController } from './changePassword.controller'
import { UserLoginController } from './login.controller'
import { UserProfileController } from './profile.controller'
import { UserRegisterController } from './register.controller'

export const UserControllers = [
    UserRegisterController,
    UserLoginController,
    UserProfileController,
    UserBecomeCoachController,
    UserBecomeAthleteController,
    UserChangePasswordController,
]
