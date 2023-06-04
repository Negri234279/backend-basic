import { UserAthleteServices } from '../../athlete/services'
import { UserAuthServices } from '../../auth/services'
import { UserCoachServices } from '../../coach/services'
import { UserProfileServices } from '../../profile/services'
import { UserAddRoleService } from './userAddRole.service'
import { UserRemoveRoleService } from './userRemoveRole.service'

export const UserServices = [
    UserAddRoleService,
    UserRemoveRoleService,
    ...UserAuthServices,
    ...UserProfileServices,
    ...UserAthleteServices,
    ...UserCoachServices,
]
