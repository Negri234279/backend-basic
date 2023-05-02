import { WorkoutModel } from '../workout.model'

export class SortWorkoutsService {
    public execute(workouts: WorkoutModel[], sortBy: WORKOUT_SORT_BY): WorkoutModel[] {
        const workoutsSorted = this.sortDefault(workouts)

        switch (sortBy) {
            case WORKOUT_SORT_BY.DEFAULT:
                return workoutsSorted

            case WORKOUT_SORT_BY.DATE_DESC:
                return workoutsSorted.sort(
                    (a: WorkoutModel, b: WorkoutModel): number =>
                        b.date.getTime() - a.date.getTime(),
                )

            default:
                throw new Error('Invlid sort')
        }
    }

    private sortDefault = (workouts: WorkoutModel[]) => {
        return workouts.sort((a: WorkoutModel, b: WorkoutModel) => {
            const keywords = ['SQHG', 'SQLB', 'SQ', 'BP', 'DL', 'SDL']

            for (const keyword of keywords) {
                if (a.name.includes(keyword) && !b.name.includes(keyword)) return -1
                else if (b.name.includes(keyword) && !a.name.includes(keyword)) return 1
            }

            return a.date.getTime() - b.date.getTime()
        })
    }
}

export enum WORKOUT_SORT_BY {
    DEFAULT = 0,
    DATE_DESC = 1,
}
