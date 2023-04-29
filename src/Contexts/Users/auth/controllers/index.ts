import { UserChangePasswordController } from './changePassword.controller'
import { UserLoginController } from './login.controller'
import { UserRegisterController } from './register.controller'
import { UserResetPasswordController } from './resetPassword.controller'

export const UserAuthControllers = [
    UserRegisterController,
    UserLoginController,
    UserChangePasswordController,
    UserResetPasswordController,
]
