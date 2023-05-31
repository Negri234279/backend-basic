import { WorkoutCoachCreateController } from './create.controller'
import { WorkoutCoachDeleteController } from './delete.controller'
import { WorkoutFindByCoachAthleteController } from './findByCoachAthlete.controller'
import { WorkoutCoachUpdateController } from './update.controller'

export const WorkoutCoachControllers = [
    WorkoutFindByCoachAthleteController,
    WorkoutCoachCreateController,
    WorkoutCoachUpdateController,
    WorkoutCoachDeleteController,
]
