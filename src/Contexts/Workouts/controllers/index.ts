import { WorkoutCreateController } from './create.controller'
import { WorkoutDeleteController } from './delete.controller'
import { WorkoutFindByAthleteController } from './findByAthlete.controller'
import { WorkoutFindByCoachAthleteController } from './findByCoachAthlete.controller'
import { WorkoutFindOneByAthleteController } from './findOneByAthlete.controller'
import { WorkoutUpdateController } from './update.controller'

export const WorkoutControllers = [
    WorkoutFindByAthleteController,
    WorkoutFindByCoachAthleteController,
    WorkoutFindOneByAthleteController,
    WorkoutCreateController,
    WorkoutUpdateController,
    WorkoutDeleteController,
]
