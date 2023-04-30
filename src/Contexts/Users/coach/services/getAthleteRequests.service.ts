import { Injectable, NotFoundException } from '@nestjs/common'

import { UsersRepository } from '../../shared/database/users.repository'
import { UserModel } from '../../shared/user.model'

@Injectable()
export class UserCoachGetAthleteRequestsService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(idCoach: string): Promise<UserModel> {
        const coach = await this.usersRepository.findOne(idCoach)
        if (!coach || !coach.isCoach()) {
            throw new NotFoundException()
        }

        return await this.usersRepository.findAthleteRequests(idCoach)
    }
}
