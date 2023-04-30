import { UserCoachAcceptAthleteController } from './acceptAthlete.controller'
import { UserAddCoachRoleController } from './addCoachRole.controller'
import { UserCoachesListController } from './coachesList.controller'
import { UserRemoveCoachRoleController } from './removeCoachRole.controller'
import { UserCoachSendRequestToCoachController } from './sendRequestToCoach.controller'

export const UserCoachControllers = [
    UserCoachesListController,
    UserCoachSendRequestToCoachController,
    UserCoachAcceptAthleteController,
    UserAddCoachRoleController,
    UserRemoveCoachRoleController,
]
