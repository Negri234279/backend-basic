import { WorkoutCreateService } from './create.service'
import { WorkoutDeleteService } from './delete.service'
import { FilterWorkoutsService } from './filterWorkouts.service'
import { WorkoutFindByAthleteService } from './findByAthlete.service'
import { WorkoutFindByCoachAthleteService } from './findByCoachAthlete.service'
import { WorkoutFindOneByAthleteService } from './findOneByAthlete.service'
import { SortWorkoutsService } from './sortWorkout.service'
import { WorkoutUpdateService } from './update.service'

export const WorkoutServices = [
    WorkoutFindByAthleteService,
    WorkoutFindByCoachAthleteService,
    WorkoutFindOneByAthleteService,
    WorkoutCreateService,
    WorkoutUpdateService,
    WorkoutDeleteService,
    FilterWorkoutsService,
    SortWorkoutsService,
]
