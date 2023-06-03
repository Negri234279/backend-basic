import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'

import { UsersRepository } from '../../shared/database/users.repository'

@Injectable()
export class UserCoachAcceptAthleteService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(idAthlete: string, idCoach: string): Promise<void> {
        const coach = await this.usersRepository.findOne(idCoach)
        if (!coach) {
            throw new NotFoundException()
        }

        if (!coach.isCoach()) {
            throw new ConflictException()
        }

        const athlete = await this.usersRepository.findOne(idAthlete)
        if (!athlete) {
            throw new NotFoundException()
        }

        if (!athlete.isAthlete()) {
            throw new ConflictException()
        }

        athlete.acceptCoach(idCoach)
        coach.acceptAthlete(idAthlete)

        await this.usersRepository.update(athlete)
        await this.usersRepository.update(coach)
    }
}
