import { AthleteGetCoachProfileService } from './getCoachProfile.service'
import { AthleteLeaveCoachService } from './leaveCoach.service'
import { UserCoachSendRequestToCoachService } from './sendRequestToCoach.service'

export const UserAthleteServices = [
    AthleteGetCoachProfileService,
    UserCoachSendRequestToCoachService,
    AthleteLeaveCoachService,
]
