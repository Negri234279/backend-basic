import { ConflictException, Injectable } from '@nestjs/common'

import { UsersRepository } from '../../shared/database/users.repository'

@Injectable()
export class AthleteLeaveCoachService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(idAthlete: string): Promise<void> {
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
    }
}
