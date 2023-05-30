import { WorkoutCreateService } from './create.service'
import { WorkoutDeleteService } from './delete.service'
import { WorkoutFindByAthleteService } from './findByAthlete.service'
import { WorkoutFindByCoachAthleteService } from './findByCoachAthlete.service'
import { WorkoutFindOneByAthleteService } from './findOneByAthlete.service'
import { WorkoutUpdateService } from './update.service'

export const WorkoutAthleteServices = [
    WorkoutFindByAthleteService,
    WorkoutFindByCoachAthleteService,
    WorkoutFindOneByAthleteService,
    WorkoutCreateService,
    WorkoutUpdateService,
    WorkoutDeleteService,
]
