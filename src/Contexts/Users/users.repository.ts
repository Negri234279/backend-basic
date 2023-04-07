import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { IUser } from './user'
import { IUserRepository } from './user.repository'
import { UserEntity } from './user.schema'

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

    async save(user: IUser): Promise<void> {
        const newUser = this.toPersistance(user)
        const createdUser = new this.userModel(newUser)

        await createdUser.save()
    }

    async update(user: IUser): Promise<void> {
        const { _id, ...rest } = this.toPersistance(user)

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
        userEntity.role = user.role

        return userEntity
    }

    private toDomain(userEntity: UserEntity): IUser {
        return {
            id: userEntity._id,
            username: userEntity.username,
            password: userEntity.password,
            email: userEntity.email,
            role: userEntity.role,
        }
    }
}
