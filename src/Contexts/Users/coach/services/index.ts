import { UserCoachAcceptAthleteService } from './acceptAthlete.service'
import { UserCoachesListService } from './coachesList.service'
import { UserCoachGetAthleteRequestsService } from './getAthleteRequests.service'
import { UserRemoveCoachRoleService } from './removeCoachRole.service'

export const UserCoachServices = [
    UserRemoveCoachRoleService,
    UserCoachesListService,
    UserCoachAcceptAthleteService,
    UserCoachGetAthleteRequestsService,
]
