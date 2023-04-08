import { UserBecomeAthleteController } from './becomeAthlete.controller'
import { UserBecomeCoachController } from './becomeCoach.controller'
import { UserChangePasswordController } from './changePassword.controller'
import { UserCoachesListController } from './coachesList.controller'
import { UserLoginController } from './login.controller'
import { UserProfileController } from './profile.controller'
import { UserRegisterController } from './register.controller'
import { UserResetPasswordController } from './resetPassword.controller'

export const UserControllers = [
    UserProfileController,
    UserCoachesListController,
    UserRegisterController,
    UserLoginController,
    UserBecomeCoachController,
    UserBecomeAthleteController,
    UserChangePasswordController,
    UserResetPasswordController,
]
