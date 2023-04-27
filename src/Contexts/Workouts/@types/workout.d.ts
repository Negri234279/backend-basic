export interface Workout {
    id: string
    name: string
    sets: number
    reps: number
    weight: number
    date: Date
    isCompleted: boolean | null
    isSuccessful: boolean | null
    athlete: string
    coach: string | null
    createdAt: Date
    updatedAt: Date
}
