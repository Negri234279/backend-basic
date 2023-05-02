import { PaginationDto } from 'src/Core/infrastructure/dtos/pagination.dto'

import { UserModel } from '../user.model'
import { propertyUserEntity } from './user'

export interface UserRepository {
    findOne(
        id: string,
        options: { populateRequestAthletes?: boolean; populateAthletes?: boolean } = {},
    ): Promise<UserModel | null>
    findOneBy(property: propertyUserEntity, value: any): Promise<UserModel | null>
    find(
        property: propertyUserEntity,
        value: any,
        pagination?: PaginationDto,
    ): Promise<Pagination<UserModel>>

    save(user: UserModel): Promise<void>
    update(user: UserModel): Promise<void>
    delete(id: string): Promise<void>
}
