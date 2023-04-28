import { RolesGuard } from 'src/Core/infrastructure/guards/roles.guard'

import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

import { UsersRepository } from '../Users/database/users.repository'
import { UsersDbModule } from '../Users/database/usersDb.module'
import { WorkoutControllers } from './controllers'
import { WorkoutsRepository } from './database/workouts.repository'
import { WorkoutsDbModule } from './database/workoutsDb.module'
import { WorkoutServices } from './services'

@Module({
    imports: [WorkoutsDbModule, UsersDbModule],
    providers: [
        ...WorkoutServices,
        WorkoutsRepository,
        UsersRepository,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
    controllers: [...WorkoutControllers],
    exports: [WorkoutsDbModule, WorkoutsRepository],
})
export class WorkoutsModule {}
