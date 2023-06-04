import { ConflictException, Injectable } from '@nestjs/common'

import { UsersRepository } from '../../shared/database/users.repository'
import { UserModel } from '../../shared/user.model'

@Injectable()
export class AthleteLeaveCoachService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(idAthlete: string): Promise<UserModel> {
        const athlete = await this.usersRepository.findOne(idAthlete)
        if (!athlete || !athlete.isAthlete()) {
            throw new ConflictException()
        }

        const coach = await this.usersRepository.findOne(athlete.coach as string)
        if (!coach) {
            throw new ConflictException()
        }

        coach.leaveAthlete(idAthlete)
        athlete.leaveCoach()

        await this.usersRepository.update(coach)
        await this.usersRepository.update(athlete)

        return athlete
    }
}
