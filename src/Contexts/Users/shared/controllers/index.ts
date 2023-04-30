import { UserAthleteControllers } from '../../athlete/controllers'
import { UserAuthControllers } from '../../auth/controllers'
import { UserCoachControllers } from '../../coach/controllers'
import { UserProfileControllers } from '../../profile/controllers'

export const UserControllers = [
    ...UserAuthControllers,
    ...UserProfileControllers,
    ...UserAthleteControllers,
    ...UserCoachControllers,
]
