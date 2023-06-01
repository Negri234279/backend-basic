import { WorkoutAthleteServices } from '../athlete/services'
import { WorkoutCoachServices } from '../coach/services'
import { WorkoutFindOneService } from './services/findOne.service'

export const WorkoutServices = [
    WorkoutFindOneService,
    ...WorkoutAthleteServices,
    ...WorkoutCoachServices,
]
