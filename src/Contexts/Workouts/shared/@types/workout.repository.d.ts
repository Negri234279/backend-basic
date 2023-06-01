import { WorkoutAthleteFiltersDto } from '../../athlete/dtos/workoutsAthleteFilters.dto'
import { WorkoutModel } from '../workout.model'

export interface WorkoutRepository {
    exist(id: string): Promise<boolean>
    findOne(id: string): Promise<WorkoutModel | null>
    findOneByAthelte(athlete: string, id: string): Promise<WorkoutModel | null>
    findByAthlete(
        filters: WorkoutAthleteFiltersDto,
        athlete: string,
        coach?: string,
    ): Promise<WorkoutModel[]>
    findByCoach(athlete: string, coach: string, filters: WorkoutFiltersDto): Promise<WorkoutModel[]>
    save(workout: WorkoutModel): Promise<void>
    update(workout: WorkoutModel): Promise<void>
    delete(id: string): Promise<void>
}
