import { Module } from '@nestjs/common'

import { UsersRepository } from '../Users/database/users.repository'
import { UsersDbModule } from '../Users/database/usersDb.module'
import { WorkoutControllers } from './controllers'
import { WorkoutsRepository } from './database/workouts.repository'
import { WorkoutsDbModule } from './database/workoutsDb.module'
import { WorkoutServices } from './services'

@Module({
    imports: [WorkoutsDbModule, UsersDbModule],
    providers: [...WorkoutServices, WorkoutsRepository, UsersRepository],
    controllers: [...WorkoutControllers],
})
export class WorkoutsModule {}
