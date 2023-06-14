import { UserGetAvatarController } from './getAvatar.controller'
import { UserProfileController } from './getProfile.controller'
import { UserProfileUpdateController } from './updateProfile.controller'
import { UserProfileUpdateAvatarController } from './uploadAvatar.controller'

export const UserProfileControllers = [
    UserGetAvatarController,
    UserProfileController,
    UserProfileUpdateController,
    UserProfileUpdateAvatarController,
]
