import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { PaginationService } from 'src/Core/application/services/pagination.service'
import { RolesGuard } from 'src/Core/infrastructure/guards/roles.guard'

import { UsersRepository } from '../Users/shared/database/users.repository'
import { UsersDbModule } from '../Users/shared/database/usersDb.module'
import { WorkoutsRepository } from './shared/database/workouts.repository'
import { WorkoutsDbModule } from './shared/database/workoutsDb.module'
import { WorkoutControllers } from './shared/controllers'
import { WorkoutServices } from './shared/index.service'

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
