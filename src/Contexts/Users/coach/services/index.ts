import { UserCoachAcceptAthleteService } from './acceptAthlete.service'
import { UserCoachesListService } from './coachesList.service'
import { UserCoachGetAthleteRequestsService } from './getAthleteRequests.service'
import { UserCoachGetAthletesService } from './getAthletes.service'
import { UserCoachRejectAthleteService } from './rejectAthlete.service'

export const UserCoachServices = [
    UserCoachesListService,
    UserCoachAcceptAthleteService,
    UserCoachGetAthleteRequestsService,
    UserCoachGetAthletesService,
    UserCoachRejectAthleteService,
]
