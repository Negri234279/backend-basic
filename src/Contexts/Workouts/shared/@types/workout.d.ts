export interface Workout {
    id: string
    name: string
    sets: number
    reps: number
    weight: number
    date: Date
    isCompleted: boolean
    isSuccessful: boolean
    athlete: string
    coach: string | null
    createdAt: Date
    updatedAt: Date
}
