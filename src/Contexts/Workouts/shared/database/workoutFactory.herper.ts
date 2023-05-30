import { faker } from '@faker-js/faker'
import { athlete as userAthlete } from 'src/Contexts/Users/shared/database/users.seeder'

import { Workout } from '../@types/workout'
import { WorkoutEntity } from './workout.schema'

export const workoutFactory = ({
    id = faker.datatype.uuid(),
    name = faker.helpers.arrayElement(workoutNameValues),
    sets = faker.datatype.number({ min: 1, max: 8 }),
    reps = faker.datatype.number({ min: 1, max: 20 }),
    weight = randomWeight(),
    date = faker.date.recent(),
    isCompleted = faker.datatype.boolean(),
    isSuccessful = faker.datatype.boolean(),
    athlete = userAthlete.id,
    coach = null,
    createdAt = faker.date.past(),
    updatedAt = faker.date.between(createdAt, new Date()),
}: Partial<Workout> = {}): WorkoutEntity => {
    return {
        _id: id,
        name,
        sets,
        reps,
        weight,
        date,
        isCompleted,
        isSuccessful,
        athlete,
        coach,
        createdAt,
        updatedAt,
    }
}

export const workoutNameValues = [
    'SQHG',
    'SQHG Pines',
    'SQHG Pausa 1"',
    'SQLB',
    'SQLB Pines',
    'SQLB Pausa 1"',
    'BP',
    'BP Pausa 1"',
    'BP Larsen',
    'BP Spotto',
    'DL',
    'SDL',
    'SDL Pausa',
    'SDL Doble Pausa',
]

export const randomWeight = ({
    min = 50,
    max = 200,
}: {
    min?: number
    max?: number
} = {}): number => {
    const valueRange = (max - min) / 2.5

    return Math.floor(Math.random() * valueRange) * 2.5 + min
}

export const getDateBetweenOfWeek = (): Date => {
    const date = faker.date.between(getFirstDayOfWeek(), getLastDayOfWeek()).setHours(0, 0, 0, 0)

    return new Date(date)
}

export const getDateBetweenOfMonth = (): Date => {
    const date = faker.date.between(getFirstDayOfMonth(), getLastDayOfMonth()).setHours(0, 0, 0, 0)

    return new Date(date)
}

const getFirstDayOfWeek = () => {
    const actualDate = new Date()
    const day = actualDate.getDay()
    const diff = actualDate.getDate() - day + (day === 0 ? -6 : 1)
    const firstDay = new Date(actualDate.setDate(diff))

    return new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate())
}

const getLastDayOfWeek = () => {
    const firstDay = getFirstDayOfWeek()
    const lastDay = new Date(firstDay)

    return lastDay.setDate(lastDay.getDate() + 6)
}

const getFirstDayOfMonth = () => {
    const actualMonth = new Date()

    return new Date(actualMonth.getFullYear(), actualMonth.getMonth(), 1)
}

const getLastDayOfMonth = () => {
    const actualMonth = new Date()

    return new Date(actualMonth.getFullYear(), actualMonth.getMonth() + 1, 0)
}
