import { Injectable, ConflictException } from '@nestjs/common'

import { UsersRepository } from '../../shared/database/users.repository'

@Injectable()
export class AthleteSendRequestToCoachService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(idAthlete: string, idCoach: string): Promise<void> {
        const athlete = await this.usersRepository.findOne(idAthlete)
        if (!athlete || !athlete.isAthlete() || athlete.coach) {
            throw new ConflictException()
        }

        const coach = await this.usersRepository.findOne(idCoach)
        if (!coach || !coach.isCoach()) {
            throw new ConflictException()
        }

        coach.sendRequestToCoach(idAthlete)

        await this.usersRepository.update(coach)
    }
}
