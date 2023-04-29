import { UserAddCoachRoleService } from '../../coach/services/addCoachRole.service'
import { UserChangePasswordService } from '../../auth/services/changePassword.service'
import { UserCoachesListService } from '../../coach/services/coachesList.service'
import { UserLoginService } from '../../auth/services/login.service'
import { UserProfileService } from '../../profile/services/profile.service'
import { UserRegisterService } from '../../auth/services/register.service'
import { UserRemoveCoachRoleService } from '../../coach/services/removeCoachRole.service'
import { UserResetPasswordService } from '../../auth/services/resetPassword.service'

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
