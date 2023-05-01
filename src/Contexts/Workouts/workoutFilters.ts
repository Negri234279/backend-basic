import { WorkoutModel } from './workout.model'

export class FilterWorkouts {
    public static execute(workouts: WorkoutModel[], filterBy: WORKOUT_FILTERS_BY): WorkoutModel[] {
        switch (filterBy) {
            case WORKOUT_FILTERS_BY.DEFAULT:
                const firstDayWeek = this.getFirstDayOfWeek()
                const lastDayWeek = this.getLastDayOfWeek()

                return workouts.filter((a) => {
                    const date = new Date(a.date)
                    console.log(date)

                    return this.compareDate(date, firstDayWeek, lastDayWeek)
                })

            case WORKOUT_FILTERS_BY.MONTH:
                const firstDayMonth = this.getFirstDayOfMonth()
                const lastDayMonth = this.getLastDayOfMonth()

                return workouts.filter((a) => {
                    const date = new Date(a.date)

                    return this.compareDate(date, firstDayMonth, lastDayMonth)
                })

            case WORKOUT_FILTERS_BY.DAY:
                return workouts.filter((a) => {
                    const date = new Date(a.date)

                    return this.datesIsSameDay(date, new Date())
                })

            case WORKOUT_FILTERS_BY.ALL:
                return workouts

            default:
                throw new Error('Invlid filter')
        }
    }

    private static compareDate = (date: Date, firstDate: Date, secondDate: Date): boolean =>
        date >= firstDate && date <= secondDate

    private static getFirstDayOfMonth = (): Date => {
        const actualMonth = new Date()

        return new Date(actualMonth.getFullYear(), actualMonth.getMonth(), 1)
    }

    private static getLastDayOfMonth = (): Date => {
        const actualMonth = new Date()

        return new Date(actualMonth.getFullYear(), actualMonth.getMonth() + 1, 0)
    }

    private static getFirstDayOfWeek = (): Date => {
        const actualDate = new Date()
        const day = actualDate.getDay()
        const diff = actualDate.getDate() - day + (day === 0 ? -6 : 1)
        const firstDay = new Date(actualDate.setDate(diff))

        return new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate())
    }

    private static getLastDayOfWeek = (): Date => {
        const firstDay = this.getFirstDayOfWeek()
        const lastDay = new Date(firstDay)

        return new Date(lastDay.setDate(lastDay.getDate() + 6))
    }

    private static datesIsSameDay = (firstDate: Date, secondDate: Date): boolean =>
        firstDate.getFullYear() === secondDate.getFullYear() &&
        firstDate.getMonth() === secondDate.getMonth() &&
        firstDate.getDate() === secondDate.getDate()
}

export enum WORKOUT_FILTERS_BY {
    DEFAULT = 0,
    DAY = 1,
    MONTH = 2,
    ALL = 3,
}

export class SortBy {
    public static execute(workouts: WorkoutModel[], sortBy: WORKOUT_SORT_BY): WorkoutModel[] {
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

    private static sortDefault = (workouts: WorkoutModel[]) => {
        return workouts.sort((a: WorkoutModel, b: WorkoutModel) => {
            if (a.date.getTime() > b.date.getTime()) return 1
            else if (a.date.getTime() < b.date.getTime()) return -1
            else if (a.date.getTime() === b.date.getTime()) {
                if (a.name.includes('SQ')) return -1
                else if (a.name.includes('BP') && b.name.includes('DL')) return -1
                else if (a.name < b.name) return 1
                else return 0
            } else return 0
        })
    }
}

export enum WORKOUT_SORT_BY {
    DEFAULT = 0,
    DATE_DESC = 1,
}
