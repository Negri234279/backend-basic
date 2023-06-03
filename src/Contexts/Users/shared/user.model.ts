import { ConflictException, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { UserPayload } from 'src/Core/infrastructure/@types/userPayload'

import { AthleteProfile, CoachProfile, User, UserProfile } from './@types/user'
import { UserRole } from './userRole'
import { UserEntity } from './database/user.schema'

export class UserModel implements User {
    public id: string
    public username: string
    public password: string
    public email: string
    public name: string
    public surname: string
    public role: UserRole[]
    public coach: null | string | UserModel
    public athletes?: string[] | UserModel[]
    public athleteRequests?: string[] | UserModel[]
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
        this.athletes = props.athletes
        this.athleteRequests = props.athleteRequests
        this.createdAt = props.createdAt
        this.updatedAt = props.updatedAt
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
        const { id, name, surname, username, coach } = this
        return { id, name, surname, username, coach }
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

    public addRole(role: UserRole): void {
        const hasRole = this.role.includes(role)
        if (hasRole) {
            throw new ConflictException()
        }

        this.role.push(role)
    }

    public removeRole(role: UserRole): void {
        const hasRole = this.role.includes(role)
        if (!hasRole) {
            throw new ConflictException()
        }

        this.role = this.role.filter((rol) => rol !== role)
    }

    public sendRequestToCoach(idAthlete: string): void {
        const isAthleteRequested = this.athleteRequests.includes(idAthlete as UserModel & string)
        const isAthleteAccepted = this.athletes.includes(idAthlete as UserModel & string)

        if (isAthleteRequested || isAthleteAccepted) {
            throw new ConflictException()
        }

        this.athleteRequests.push(idAthlete as UserModel & string)
    }

    public acceptAthlete(idAthlete: string): void {
        const isAthleteRequested = this.athleteRequests.includes(idAthlete as UserModel & string)
        const isAthleteAccepted = this.athletes.includes(idAthlete as UserModel & string)

        if (!isAthleteRequested || isAthleteAccepted) {
            throw new ConflictException()
        }

        this.athletes.push(idAthlete as UserModel & string)

        const athleteRequests = this.athleteRequests as string[]
        this.athleteRequests = athleteRequests.filter((id) => id !== idAthlete)
    }

    public acceptCoach(idCoach: string): void {
        const hasCoach = !!this.coach

        if (hasCoach) {
            throw new ConflictException()
        }

        this.coach = idCoach
    }

    public rejectAthlete(idAthlete: string): void {
        const isAthleteRequested = this.athleteRequests.includes(idAthlete as UserModel & string)
        const isAthleteAccepted = this.athletes.includes(idAthlete as UserModel & string)

        if (!isAthleteRequested || isAthleteAccepted) {
            throw new ConflictException()
        }

        const athleteRequests = this.athleteRequests as string[]
        this.athleteRequests = athleteRequests.filter((id) => id !== idAthlete)
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

    public static toDomain(userEntity: UserEntity): UserModel {
        const { _id, coach, athletes, athleteRequests, ...restUserModel } = userEntity

        const coachDTO: UserModel | string | null =
            coach === null || typeof coach === 'string' ? coach : UserModel.toDomain(coach)

        const athletesDTO: (UserModel | string)[] = athletes.map((athlete) => {
            if (typeof athlete === 'string') {
                return athlete
            }
            return UserModel.toDomain(athlete)
        })

        const athleteRequestsDTO: (UserModel | string)[] = athleteRequests.map((athlete) => {
            if (typeof athlete === 'string') {
                return athlete
            }
            return UserModel.toDomain(athlete)
        })

        return new UserModel({
            id: _id,
            ...restUserModel,
            coach: coachDTO,
            athletes: athletesDTO,
            athleteRequests: athleteRequestsDTO,
        })
    }

    public toPersistence(): UserEntity {
        const coachDTO: null | string = this.coach instanceof UserModel ? this.coach.id : this.coach

        const athletesDTO: string[] = this.athletes?.map((athlete) =>
            typeof athlete === 'string' ? athlete : athlete.id,
        )

        const athleteRequestsDTO: string[] = this.athleteRequests?.map((athleteRequest) =>
            typeof athleteRequest === 'string' ? athleteRequest : athleteRequest.id,
        )

        const userEntity = new UserEntity()
        userEntity._id = this.id
        userEntity.username = this.username
        userEntity.password = this.password
        userEntity.email = this.email
        userEntity.name = this.name
        userEntity.surname = this.surname
        userEntity.role = this.role
        userEntity.coach = coachDTO
        userEntity.athletes = athletesDTO
        userEntity.athleteRequests = athleteRequestsDTO
        userEntity.createdAt = this.createdAt
        userEntity.updatedAt = this.updatedAt

        return userEntity
    }
}
