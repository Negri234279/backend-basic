import { WorkoutAthleteControllers } from '../athlete/controllers'
import { WorkoutCoachControllers } from '../coach/controllers'

export const WorkoutControllers = [...WorkoutAthleteControllers, ...WorkoutCoachControllers]
