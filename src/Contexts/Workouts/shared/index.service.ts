import { WorkoutAthleteServices } from '../athlete/services'
import { WorkoutCoachServices } from '../coach/services'

export const WorkoutServices = [...WorkoutAthleteServices, ...WorkoutCoachServices]
