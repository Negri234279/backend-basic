import { AthleteAddRoleController } from './addAthleteRole.controller'
import { AthleteRemoveRoleController } from './removeAthleteRole.controller'
import { UserCoachSendRequestToCoachController } from './sendRequestToCoach.controller'

export const UserAthleteControllers = [
    UserCoachSendRequestToCoachController,
    AthleteAddRoleController,
    AthleteRemoveRoleController,
]
