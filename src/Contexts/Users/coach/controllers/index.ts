import { UserCoachAcceptAthleteController } from './acceptAthlete.controller'
import { UserAddCoachRoleController } from './addCoachRole.controller'
import { UserCoachesListController } from './coachesList.controller'
import { UserCoachGetAthleteRequestsController } from './getAthleteRequests.controller'
import { UserCoachGetAthletesController } from './getAthletes.controller'
import { UserCoachRejectAthleteController } from './rejectAthlete.controller'
import { UserRemoveCoachRoleController } from './removeCoachRole.controller'

export const UserCoachControllers = [
    UserCoachesListController,
    UserCoachGetAthleteRequestsController,
    UserCoachGetAthletesController,
    UserCoachAcceptAthleteController,
    UserAddCoachRoleController,
    UserRemoveCoachRoleController,
    UserCoachRejectAthleteController,
]
