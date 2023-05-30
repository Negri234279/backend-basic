import { WorkoutModel } from '../workout.model'

export interface WorkoutRepository {
    exist(id: string): Promise<boolean>
    findOne(id: string): Promise<WorkoutModel | null>
    findOneByAthelte(athlete: string, id: string): Promise<WorkoutModel | null>
    find(athlete: string, coach?: string, filters?: WorkoutFilters): Promise<WorkoutModel[]>

    save(workout: WorkoutModel): Promise<void>
    update(workout: WorkoutModel): Promise<void>
    delete(id: string): Promise<void>
}
