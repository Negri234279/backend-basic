export class WorkoutModel {
    public id: string
    public name: string
    public sets: number
    public reps: number
    public weight: number
    public date: Date
    public isCompleted: boolean
    public isSuccessful: boolean | null
    public athleteId: string
    public coachId: string | null
    public createdAt: Date
    public updatedAt: Date

    constructor(props: IWorkout) {
        this.id = props.id
        this.name = props.name
        this.sets = props.sets
        this.reps = props.reps
        this.weight = props.weight
        this.date = props.date
        this.isCompleted = props.isCompleted
        this.isSuccessful = props.isSuccessful
        this.athleteId = props.athleteId
        this.coachId = props.coachId
        this.createdAt = props.createdAt
        this.updatedAt = props.updatedAt
    }
}

export interface IWorkout {
    id: string
    name: string
    sets: number
    reps: number
    weight: number
    date: Date
    isCompleted: boolean
    isSuccessful: boolean | null
    athleteId: string
    coachId: string | null
    createdAt: Date
    updatedAt: Date
}
