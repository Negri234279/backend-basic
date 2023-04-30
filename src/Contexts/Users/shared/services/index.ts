import { UserAuthServices } from '../../auth/services'
import { UserCoachServices } from '../../coach/services'
import { UserProfileServices } from '../../profile/services'

export const UserServices = [...UserAuthServices, ...UserCoachServices, ...UserProfileServices]
