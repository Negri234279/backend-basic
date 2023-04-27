import { UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { UserPayload } from 'src/Core/infrastructure/@types/userPayload'

import { AthleteProfile, CoachProfile, User, UserProfile } from './@types/user'
import { UserRole } from './userRole'

export class UserModel implements User {
    public id: string
    public username: string
    public password: string
    public email: string
    public name: string
    public surname: string
    public role: UserRole[]
    public coach?: string
    public athleteRequests?: string[]
    public createdAt: Date
    public updatedAt: Date
    private static salt = 10

    constructor(props: User) {
        this.id = props.id
        this.username = props.username
        this.password = props.password
        this.email = props.email
        this.name = props.name
        this.surname = props.surname
        this.role = props.role
        this.coach = props.coach
        this.athleteRequests = props.athleteRequests
        this.createdAt = props.createdAt
        this.updatedAt = props.updatedAt
    }

    public static create({
        id,
        username,
        password,
        email,
        name,
        surname,
    }: Partial<User>): UserModel {
        const newDate = new Date()

        return new UserModel({
            id,
            username,
            password,
            email,
            name,
            surname,
            role: [UserRole.ATHLETE],
            createdAt: newDate,
            updatedAt: newDate,
        })
    }

    public toPayload(): UserPayload {
        const { id, username, email, role } = this
        return { id, username, email, role }
    }

    public toUserProfile(): UserProfile {
        const { username, email, name, surname, role, createdAt, updatedAt } = this

        return {
            username,
            email,
            name,
            surname,
            role,
            createdAt,
            updatedAt,
        }
    }

    public toAthleteProfile(): AthleteProfile {
        const { id, name, surname, username } = this
        return { id, name, surname, username }
    }

    public toCoachProfile(): CoachProfile {
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
