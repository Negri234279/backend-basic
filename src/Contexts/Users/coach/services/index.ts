import { UserCoachAcceptAthleteService } from './acceptAthlete.service'
import { UserCoachesListService } from './coachesList.service'
import { UserCoachGetAthleteRequestsService } from './getAthleteRequests.service'
import { UserCoachGetAthletesService } from './getAthletes.service'
import { UserCoachRejectAthleteService } from './rejectAthlete.service'
import { UserRemoveCoachRoleService } from './removeCoachRole.service'

export const UserCoachServices = [
    UserRemoveCoachRoleService,
    UserCoachesListService,
    UserCoachAcceptAthleteService,
    UserCoachGetAthleteRequestsService,
    UserCoachGetAthletesService,
    UserCoachRejectAthleteService,
]
