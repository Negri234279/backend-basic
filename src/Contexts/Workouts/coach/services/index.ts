import { WorkoutCoachCreateService } from './create.service'
import { WorkoutCoachDeleteService } from './delete.service'
import { WorkoutFindByCoachAthleteService } from './findByCoachAthlete.service'
import { WorkoutCoachUpdateService } from './update.service'

export const WorkoutCoachServices = [
    WorkoutFindByCoachAthleteService,
    WorkoutCoachCreateService,
    WorkoutCoachUpdateService,
    WorkoutCoachDeleteService,
]
