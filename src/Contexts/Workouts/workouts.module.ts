import { RolesGuard } from 'src/Core/infrastructure/guards/roles.guard'

import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

import { UsersRepository } from '../Users/shared/database/users.repository'
import { UsersDbModule } from '../Users/shared/database/usersDb.module'
import { WorkoutControllers } from './controllers'
import { WorkoutsRepository } from './database/workouts.repository'
import { WorkoutsDbModule } from './database/workoutsDb.module'
import { WorkoutServices } from './services'
import { PaginationService } from 'src/Core/application/services/pagination.service'

@Module({
    imports: [WorkoutsDbModule, UsersDbModule],
    providers: [
        ...WorkoutServices,
        WorkoutsRepository,
        UsersRepository,
        PaginationService,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
    controllers: [...WorkoutControllers],
    exports: [WorkoutsDbModule, WorkoutsRepository],
})
export class WorkoutsModule {}
