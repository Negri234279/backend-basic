import { WorkoutCreateService } from './create.service'
import { WorkoutDeleteService } from './delete.service'
import { WorkoutFindByAthleteService } from './findByAthlete.service'
import { WorkoutFindOneByAthleteService } from './findOneByAthlete.service'
import { WorkoutUpdateService } from './update.service'
import { FilterWorkoutsService } from './filterWorkouts.service'
import { SortWorkoutsService } from './sortWorkout.service'

export const WorkoutServices = [
    WorkoutFindByAthleteService,
    WorkoutFindOneByAthleteService,
    WorkoutCreateService,
    WorkoutUpdateService,
    WorkoutDeleteService,
    FilterWorkoutsService,
    SortWorkoutsService,
]
