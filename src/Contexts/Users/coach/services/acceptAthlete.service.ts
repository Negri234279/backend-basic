import { Injectable, NotFoundException } from '@nestjs/common'

import { UsersRepository } from '../../shared/database/users.repository'

@Injectable()
export class UserCoachAcceptAthleteService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(idAthlete: string, idCoach: string): Promise<void> {
        const athlete = await this.usersRepository.findOne(idAthlete)
        if (!athlete || !athlete.isAthlete()) {
            throw new NotFoundException()
        }

        const coach = await this.usersRepository.findOne(idCoach)
        if (!coach || !coach.isCoach()) {
            throw new NotFoundException()
        }

        coach.acceptAthlete(idAthlete)

        await this.usersRepository.update(coach)
    }
}
