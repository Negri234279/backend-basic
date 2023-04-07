import { Injectable } from '@nestjs/common'

import { IUser } from './user'
import { IUserRepository } from './user.repository'

@Injectable()
export class UsersRepository implements IUserRepository {
    private readonly users: IUser[] = [
        {
            id: '001',
            username: 'john',
            password:
                '$2b$10$ortK9gOTtIf0lTPV8z/Gge2uSuf1XL.63SlSeQ.srfCBfG2XLgzei',
            email: 'john@gmail.com',
            role: 'athlete',
        },
        {
            id: '002',
            username: 'maria',
            password:
                '$2b$10$ortK9gOTtIf0lTPV8z/Gge2uSuf1XL.63SlSeQ.srfCBfG2XLgzei',
            email: 'maria@gmail.com',
            role: 'athlete',
        },
    ]

    async findOne(id: string): Promise<IUser | null> {
        const user = this.users.find((user) => user.id === id)

        if (!user) {
            return null
        }

        return user
    }

    async findOneByEmail(email: string): Promise<IUser | null> {
        const user = this.users.find((user) => user.email === email)

        if (!user) {
            return null
        }

        return user
    }

    async findOneByUsername(username: string): Promise<IUser | null> {
        const user = this.users.find((user) => user.username === username)

        if (!user) {
            return null
        }

        return user
    }

    async save(user: IUser): Promise<void> {
        this.users.push(user)
        return
    }

    async update(_user: IUser): Promise<void> {
        throw new Error('Method not implemented.')
    }

    async delete(_id: string): Promise<void> {
        throw new Error('Method not implemented.')
    }
}
