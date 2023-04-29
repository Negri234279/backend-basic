import { UserModel } from '../user.model'

export interface UserRepository {
    findOne(id: string): Promise<UserModel | null>
    findOneByEmail(email: string): Promise<UserModel | null>
    findOneByUsername(username: string): Promise<UserModel | null>
    findCoaches(pagination: PaginationDto): Promise<UserModel[]>
    countCoaches(): Promise<number>

    save(user: UserModel): Promise<void>
    update(user: UserModel): Promise<void>
    delete(id: string): Promise<void>
}
