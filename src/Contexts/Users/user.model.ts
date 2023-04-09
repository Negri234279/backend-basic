import * as bcrypt from 'bcrypt'
import { UserPayload } from 'src/Core/infrastructure/@types/userPayload'

import { Coach, IUser, IUserProfile } from './user'
import { UserRole } from './userRole'
import { UnauthorizedException } from '@nestjs/common'

export class UserModel implements IUser {
    private static salt = 10

    constructor(
        public id: string,
        public username: string,
        public password: string,
        public email: string,
        public name: string,
        public surname: string,
        public role: UserRole[],
        public createdAt: Date,
        public updatedAt: Date,
        public coach?: string,
    ) {}

    public static create(
        id: string,
        username: string,
        password: string,
        email: string,
        name: string,
        surname: string,
    ): UserModel {
        const newDate = new Date()

        return new UserModel(
            id,
            username,
            password,
            email,
            name,
            surname,
            [UserRole.ATHLETE],
            newDate,
            newDate,
        )
    }

    public toProfile(): IUserProfile {
        const { id: _id, coach: _co, password: _pa, ...rest } = this
        return rest
    }

    public toPayload(): UserPayload {
        const { id, username, email, role } = this
        return { id, username, email, role }
    }

    public toCoachProfile(): Coach {
        const { id, name, surname, username } = this
        return { id, name, surname, username }
    }

    public isCoach(): boolean {
        return this.role.includes(UserRole.COACH)
    }

    public isAthlete(): boolean {
        return this.role.includes(UserRole.ATHLETE)
    }

    public removeCoachRole(): void {
        this.role = this.role.filter((rol) => rol !== UserRole.COACH)
    }

    public addCoachRole(): void {
        this.role.push(UserRole.COACH)
    }

    public static async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.salt)
    }

    public async validatePassword(password: string): Promise<void> {
        const isMatch = await bcrypt.compare(password, this.password)
        if (!isMatch) {
            throw new UnauthorizedException()
        }
    }

    public async changePassword(password: string): Promise<void> {
        this.password = await bcrypt.hash(password, UserModel.salt)
    }

    public async randomPassword(): Promise<string> {
        const newPassword = Math.random().toString(36).slice(-16)

        this.password = await bcrypt.hash(newPassword, UserModel.salt)

        return newPassword
    }
}
