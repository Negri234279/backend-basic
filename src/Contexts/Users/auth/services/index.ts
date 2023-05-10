import { UserChangePasswordService } from './changePassword.service'
import { UserLoginService } from './login.service'
import { UserRegisterService } from './register.service'
import { UserResetPasswordService } from './resetPassword.service'

export const UserAuthServices = [
    UserLoginService,
    UserRegisterService,
    UserChangePasswordService,
    UserResetPasswordService,
]
