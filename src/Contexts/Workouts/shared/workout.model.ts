import { Workout } from './@types/workout'

export class WorkoutModel implements Workout {
    public id: string
    public name: string
    public sets: number
    public reps: number
    public weight: number
    public date: Date
    public isCompleted: boolean
    public isSuccessful: boolean
    public athlete: string
    public coach: string | null
    public createdAt: Date
    public updatedAt: Date

    constructor(props: Workout) {
        this.id = props.id
        this.name = props.name
        this.sets = props.sets
        this.reps = props.reps
        this.weight = props.weight
        this.date = props.date
        this.isCompleted = props.isCompleted
        this.isSuccessful = props.isSuccessful
        this.athlete = props.athlete
        this.coach = props.coach
        this.createdAt = props.createdAt
        this.updatedAt = props.updatedAt
    }
}
