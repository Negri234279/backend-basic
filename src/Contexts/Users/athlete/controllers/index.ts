import { AthleteAddRoleController } from './addAthleteRole.controller'
import { AthleteCancelRequestToCoachController } from './cancelRequestToCoach.controller'
import { AthleteGetCoachProfileController } from './getCoachProfile.controller'
import { AthleteLeaveCoachController } from './leaveCoach.controller'
import { AthleteRemoveRoleController } from './removeAthleteRole.controller'
import { UserCoachSendRequestToCoachController } from './sendRequestToCoach.controller'

export const UserAthleteControllers = [
    AthleteGetCoachProfileController,
    UserCoachSendRequestToCoachController,
    AthleteAddRoleController,
    AthleteRemoveRoleController,
    AthleteLeaveCoachController,
    AthleteCancelRequestToCoachController,
]
