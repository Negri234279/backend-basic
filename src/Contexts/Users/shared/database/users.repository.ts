import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Pagination } from 'src/Core/infrastructure/@types/pagination'
import { PaginationDto } from 'src/Core/infrastructure/dtos/pagination.dto'

import { propertyUserEntity } from '../@types/user'
import { UserRepository } from '../@types/user.repository'
import { UserModel } from '../user.model'
import { UserEntity } from './user.schema'

@Injectable()
export class UsersRepository implements UserRepository {
    constructor(@InjectModel(UserEntity.name) private collection: Model<UserEntity>) {}

    async exist(id: string): Promise<boolean> {
        return !!(await this.collection.countDocuments({ _id: id }).exec())
    }

    async findOne(
        id: string,
        options: { populateRequestAthletes?: boolean; populateAthletes?: boolean } = {},
    ): Promise<UserModel | null> {
        const { populateRequestAthletes = false, populateAthletes = false } = options

        const query = this.collection.findById(id)

        if (populateRequestAthletes) {
            query.populate('athleteRequests')
        }

        if (populateAthletes) {
            query.populate('athletes')
        }

        const userEntity = await query.lean().exec()

        if (!userEntity) {
            return null
        }

        return UserModel.toDomain(userEntity)
    }

    async findOneBy(property: propertyUserEntity, value: any): Promise<UserModel | null> {
        const userEntity = await this.collection
            .findOne({ [property]: value })
            .lean()
            .exec()

        if (!userEntity) {
            return null
        }

        return UserModel.toDomain(userEntity)
    }

    async find(property: propertyUserEntity, value: any): Promise<UserModel[]> {
        const users = await this.collection
            .find({ [property]: value })
            .lean()
            .exec()

        return users.map((user) => UserModel.toDomain(user))
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
