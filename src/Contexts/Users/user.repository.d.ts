import { IUser } from './user'

export interface IUserRepository {
    findOne(id: string): Promise<IUser | null>
    findOneByEmail(email: string): Promise<IUser | null>

    save(user: IUser): Promise<void>
    update(user: IUser): Promise<void>
    delete(id: string): Promise<void>
}
