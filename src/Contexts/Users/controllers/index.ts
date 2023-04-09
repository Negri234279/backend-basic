import { UserAddCoachRoleController } from './addCoachRole.controller'
import { UserChangePasswordController } from './changePassword.controller'
import { UserCoachesListController } from './coachesList.controller'
import { UserLoginController } from './login.controller'
import { UserProfileController } from './profile.controller'
import { UserRegisterController } from './register.controller'
import { UserRemoveCoachRoleController } from './removeCoachRole.controller'
import { UserResetPasswordController } from './resetPassword.controller'

export const UserControllers = [
    UserProfileController,
    UserCoachesListController,
    UserRegisterController,
    UserLoginController,
    UserAddCoachRoleController,
    UserRemoveCoachRoleController,
    UserChangePasswordController,
    UserResetPasswordController,
]
