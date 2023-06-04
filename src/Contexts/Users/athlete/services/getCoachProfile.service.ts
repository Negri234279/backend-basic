import { Injectable, ConflictException } from '@nestjs/common'

import { UsersRepository } from '../../shared/database/users.repository'
import { UserModel } from '../../shared/user.model'

@Injectable()
export class AthleteGetCoachProfileService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(idAthlete: string): Promise<UserModel> {
        const athlete = await this.usersRepository.findOne(idAthlete, { populateCoach: true })
        if (!athlete || !athlete.isAthlete() || !athlete.coach) {
            throw new ConflictException()
        }

        return athlete.coach as UserModel
    }
}
