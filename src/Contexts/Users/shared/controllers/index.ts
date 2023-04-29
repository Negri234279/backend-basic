import { UserAddCoachRoleController } from '../../coach/controllers/addCoachRole.controller'
import { UserChangePasswordController } from '../../auth/controllers/changePassword.controller'
import { UserCoachesListController } from '../../coach/controllers/coachesList.controller'
import { UserLoginController } from '../../auth/controllers/login.controller'
import { UserProfileController } from '../../profile/controllers/profile.controller'
import { UserRegisterController } from '../../auth/controllers/register.controller'
import { UserRemoveCoachRoleController } from '../../coach/controllers/removeCoachRole.controller'
import { UserResetPasswordController } from '../../auth/controllers/resetPassword.controller'

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
