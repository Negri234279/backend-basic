import { WorkoutAthleteControllers } from '../../athlete/controllers'
import { WorkoutCoachControllers } from '../../coach/controllers'
import { WorkoutFindOneController } from './findOne.controller'

export const WorkoutControllers = [
    WorkoutFindOneController,
    ...WorkoutAthleteControllers,
    ...WorkoutCoachControllers,
]
