import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { IUser } from './user'
import { IUserRepository } from './user.repository'
import { UserEntity } from './user.schema'
import { UserRole } from './userRole'

@Injectable()
export class UsersRepository implements IUserRepository {
    constructor(
        @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
    ) {}

    async findOne(id: string): Promise<IUser | null> {
        const userEntity = await this.userModel.findById(id).lean().exec()
        if (!userEntity) {
            return null
        }

        return this.toDomain(userEntity)
    }

    async findOneByEmail(email: string): Promise<IUser | null> {
        const userEntity = await this.userModel.findOne({ email }).lean().exec()
        if (!userEntity) {
            return null
        }

        return this.toDomain(userEntity)
    }

    async findOneByUsername(username: string): Promise<IUser | null> {
        const userEntity = await this.userModel
            .findOne({ username })
            .lean()
            .exec()
        if (!userEntity) {
            return null
        }

        return this.toDomain(userEntity)
    }

    async findCoaches(): Promise<IUser[] | null> {
        const userEntity = await this.userModel
            .find({ role: UserRole.COACH })
            .lean()
            .exec()
        if (!userEntity) {
            return []
        }

        return userEntity.map((user) => this.toDomain(user))
    }

    async save(user: IUser): Promise<void> {
        const newUser = this.toPersistance(user)
        const createdUser = new this.userModel(newUser)

        await createdUser.save()
    }

    async update(user: IUser): Promise<void> {
        const updatedAt = new Date()
        const { _id, ...rest } = this.toPersistance({ ...user, updatedAt })

        await this.userModel.updateOne({ _id }, rest).exec()
    }

    async delete(id: string): Promise<void> {
        await this.userModel.deleteOne({ _id: id }).exec()
    }

    private toPersistance(user: IUser): UserEntity {
        const userEntity = new UserEntity()
        userEntity._id = user.id
        userEntity.username = user.username
        userEntity.password = user.password
        userEntity.email = user.email
        userEntity.name = user.name
        userEntity.surname = user.surname
        userEntity.role = user.role
        userEntity.coach = user.coach
        userEntity.createdAt = user.createdAt
        userEntity.updatedAt = user.updatedAt

        return userEntity
    }

    private toDomain(userEntity: UserEntity): IUser {
        return {
            id: userEntity._id,
            username: userEntity.username,
            password: userEntity.password,
            email: userEntity.email,
            name: userEntity.name,
            surname: userEntity.surname,
            role: userEntity.role,
            coach: userEntity.coach,
            createdAt: userEntity.createdAt,
            updatedAt: userEntity.updatedAt,
        }
    }
}
