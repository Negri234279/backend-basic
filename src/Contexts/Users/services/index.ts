import { UserAddCoachRoleService } from './addCoachRole.service'
import { UserChangePasswordService } from './changePassword.service'
import { UserCoachesListService } from './coachesList.service'
import { UserLoginService } from './login.service'
import { UserProfileService } from './profile.service'
import { UserRegisterService } from './register.service'
import { UserRemoveCoachRoleService } from './removeCoachRole.service'
import { UserResetPasswordService } from './resetPassword.service'

export const UserServices = [
    UserLoginService,
    UserRegisterService,
    UserProfileService,
    UserAddCoachRoleService,
    UserRemoveCoachRoleService,
    UserChangePasswordService,
    UserResetPasswordService,
    UserCoachesListService,
]
