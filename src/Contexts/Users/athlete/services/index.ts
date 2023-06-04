import { AthleteCancelRequestToCoachService } from './cancelRequestToCoach.service'
import { AthleteGetCoachProfileService } from './getCoachProfile.service'
import { AthleteLeaveCoachService } from './leaveCoach.service'
import { AthleteSendRequestToCoachService } from './sendRequestToCoach.service'

export const UserAthleteServices = [
    AthleteGetCoachProfileService,
    AthleteSendRequestToCoachService,
    AthleteLeaveCoachService,
    AthleteCancelRequestToCoachService,
]
