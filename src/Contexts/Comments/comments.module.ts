import { RolesGuard } from 'src/Core/infrastructure/guards/roles.guard'

import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

import { UsersRepository } from '../Users/database/users.repository'
import { UsersDbModule } from '../Users/database/usersDb.module'
import { WorkoutsRepository } from '../Workouts/database/workouts.repository'
import { WorkoutsDbModule } from '../Workouts/database/workoutsDb.module'
import { CommentControllers } from './controllers'
import { CommentsRepository } from './database/comment.repository'
import { CommentsDbModule } from './database/commentsDb.module'
import { CommentServices } from './services'

@Module({
    imports: [CommentsDbModule, WorkoutsDbModule, UsersDbModule],
    providers: [
        ...CommentServices,
        CommentsRepository,
        WorkoutsRepository,
        UsersRepository,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
    controllers: [...CommentControllers],
})
export class CommentsModule {}
