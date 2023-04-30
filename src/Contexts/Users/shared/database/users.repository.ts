import { Model } from 'mongoose'
import { PaginationDto } from 'src/Core/infrastructure/dtos/pagination.dto'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { UserModel } from '../user.model'
import { UserRole } from '../userRole'
import { UserRepository } from '../@types/user.repository'
import { UserEntity } from './user.schema'

@Injectable()
export class UsersRepository implements UserRepository {
    constructor(@InjectModel(UserEntity.name) private collection: Model<UserEntity>) {}

    async exist(id: string): Promise<boolean> {
        return !!(await this.collection.countDocuments({ _id: id }).exec())
    }

    async findOne(id: string): Promise<UserModel | null> {
        const userEntity = await this.collection.findById(id).lean().exec()
        if (!userEntity) {
            return null
        }

        return UserModel.toDomain(userEntity)
    }

    async findOneByEmail(email: string): Promise<UserModel | null> {
        const userEntity = await this.collection.findOne({ email }).lean().exec()
        if (!userEntity) {
            return null
        }

        return UserModel.toDomain(userEntity)
    }

    async findOneByUsername(username: string): Promise<UserModel | null> {
        const userEntity = await this.collection.findOne({ username }).lean().exec()
        if (!userEntity) {
            return null
        }

        return UserModel.toDomain(userEntity)
    }

    async findCoaches(pagination: PaginationDto): Promise<UserModel[]> {
        const userEntity = await this.collection
            .find({ role: UserRole.COACH })
            .skip(pagination.page)
            .limit(pagination.limit)
            .lean()
            .exec()

        return userEntity.map((user) => UserModel.toDomain(user))
    }

    async findAthleteRequests(id: string): Promise<UserModel> {
        const userEntity = await this.collection
            .findById(id)
            .populate('athleteRequests')
            .lean()
            .exec()

        return UserModel.toDomain(userEntity)
    }

    async countCoaches(): Promise<number> {
        return this.collection.countDocuments({ role: UserRole.COACH }).exec()
    }

    async save(user: UserModel): Promise<void> {
        const newUser = user.toPersistence()
        const createdUser = new this.collection(newUser)

        await createdUser.save()
    }

    async update(user: UserModel): Promise<void> {
        user.updatedAt = new Date()

        const { _id, ...rest } = user.toPersistence()

        await this.collection.updateOne({ _id }, rest).exec()
    }

    async delete(id: string): Promise<void> {
        await this.collection.deleteOne({ _id: id }).exec()
    }
}
