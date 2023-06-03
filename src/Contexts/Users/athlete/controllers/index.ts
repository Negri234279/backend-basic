import { AthleteAddRoleController } from './addAthleteRole.controller'
import { AthleteGetCoachProfileController } from './getCoachProfile.controller'
import { AthleteRemoveRoleController } from './removeAthleteRole.controller'
import { UserCoachSendRequestToCoachController } from './sendRequestToCoach.controller'

export const UserAthleteControllers = [
    AthleteGetCoachProfileController,
    UserCoachSendRequestToCoachController,
    AthleteAddRoleController,
    AthleteRemoveRoleController,
]
