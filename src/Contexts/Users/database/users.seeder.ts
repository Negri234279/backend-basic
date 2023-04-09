import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Seeder } from 'nestjs-seeder'
import { v4 as uuidv4 } from 'uuid'

import { UserEntity } from './user.schema'
import { UserRole } from '../userRole'

@Injectable()
export class UsersSeeder implements Seeder {
    constructor(
        @InjectModel(UserEntity.name)
        private readonly collection: Model<UserEntity>,
    ) {}

    async seed(): Promise<any> {
        const users = []

        for (let i = 0; i < 100; i++) {
            users.push(createUserFactory())
        }

        return this.collection.insertMany(users)
    }

    async drop(): Promise<any> {
        return this.collection.deleteMany({})
    }
}

const createUserFactory = () => {
    const name = faker.name.firstName()
    const surname = faker.name.lastName()
    const email = faker.helpers.unique(faker.internet.email, [name, surname])
    const username = faker.helpers.unique(faker.internet.userName, [
        name,
        surname,
    ])

    // Admin1
    const password =
        '$2b$10$a34kLHwgi5B0UeaPR1r3cuHqD0OSzdo7jzu3e3NTmb/C4lIZFLDsS'

    const role = [UserRole.ATHLETE]
    if (Math.random() > 0.5) {
        role.push(UserRole.COACH)
    }

    const createdAt = faker.date.past()
    const updatedAt = faker.date.between(createdAt, new Date())

    return {
        _id: uuidv4(),
        username,
        password,
        email,
        role,
        name,
        surname,
        createdAt,
        updatedAt,
    }
}
