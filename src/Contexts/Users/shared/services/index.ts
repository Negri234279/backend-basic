import { UserAthleteServices } from '../../athlete/services'
import { UserAuthServices } from '../../auth/services'
import { UserCoachServices } from '../../coach/services'
import { UserProfileServices } from '../../profile/services'

export const UserServices = [
    ...UserAuthServices,
    ...UserProfileServices,
    ...UserAthleteServices,
    ...UserCoachServices,
]
