import { UserCoachAcceptAthleteController } from './acceptAthlete.controller'
import { UserCoachesListController } from './coachesList.controller'
import { UserCoachGetAthleteRequestsController } from './getAthleteRequests.controller'
import { UserRemoveCoachRoleController } from './removeCoachRole.controller'

export const UserCoachControllers = [
    UserCoachesListController,
    UserCoachGetAthleteRequestsController,
    UserCoachAcceptAthleteController,
    UserRemoveCoachRoleController,
]
