import { Model } from 'mongoose'
import { Seeder } from 'nestjs-seeder'
import { v4 as uuidv4 } from 'uuid'

import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { IUser } from '../user'
import { UserRole } from '../userRole'
import { UserEntity } from './user.schema'

@Injectable()
export class UsersSeeder implements Seeder {
    constructor(
        @InjectModel(UserEntity.name)
        private readonly collection: Model<UserEntity>,
    ) {}

    async seed(): Promise<any> {
        const numUsersSeeder = Number(process.env.USERS_SEEDER) ?? 98
        const users: UserEntity[] = []

        for (let i = 0; i < numUsersSeeder; i++) {
            users.push(createUserFactory())
        }

        users.push(createUserFactory(athlete))
        users.push(createUserFactory(coach))

        return this.collection.insertMany(users)
    }

    async drop(): Promise<any> {
        return this.collection.deleteMany({})
    }
}

const createUserFactory = ({
    name = faker.name.firstName(),
    surname = faker.name.lastName(),
    email = faker.helpers.unique(faker.internet.email, [name, surname]),
    username = faker.helpers.unique(faker.internet.userName, [name, surname]),
    password = '$2b$10$a34kLHwgi5B0UeaPR1r3cuHqD0OSzdo7jzu3e3NTmb/C4lIZFLDsS',
    role = [
        UserRole.ATHLETE,
        Math.random() > 0.5 ? UserRole.COACH : null,
    ].filter(Boolean),
    createdAt = faker.date.past(),
    updatedAt = faker.date.between(createdAt, new Date()),
    id = uuidv4(),
}: Partial<IUser> = {}): UserEntity => ({
    _id: id,
    username,
    password,
    email,
    role,
    name,
    surname,
    createdAt,
    updatedAt,
})

export const athlete: Partial<IUser> = {
    id: 'c3b95fa5-16c1-43ba-b1a1-32db64793f61',
    email: 'usuario@usuario.com',
}

export const coach: Partial<IUser> = {
    id: '36f99bf2-c8a6-4ac4-a233-c2ed6342be45',
    email: 'coach@gmail.com',
}
