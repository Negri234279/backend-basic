import { GetAvatarService } from './getAvatar.service'
import { UserProfileService } from './profile.service'
import { UpdateUserProfileService } from './updateProfile.service'
import { UploadAvatarService } from './uploadAvatar.service'

export const UserProfileServices = [
    UserProfileService,
    UpdateUserProfileService,
    GetAvatarService,
    UploadAvatarService,
]
