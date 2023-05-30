import { ConfigModule } from '@nestjs/config'
import { seeder } from 'nestjs-seeder'
import { CommentSeeder } from 'src/Contexts/Comments/database/comment.seeder'
import { CommentsDbModule } from 'src/Contexts/Comments/database/commentsDb.module'
import { UsersDbModule } from 'src/Contexts/Users/shared/database/usersDb.module'
import { WorkoutsSeeder } from 'src/Contexts/Workouts/shared/database/workouts.seeder'
import { WorkoutsDbModule } from 'src/Contexts/Workouts/shared/database/workoutsDb.module'

import { UsersSeeder } from '../../../Contexts/Users/shared/database/users.seeder'
import configuration from '../config/configuration'
import { MongoModule } from './mongo.module'
import { WorkoutsRepository } from 'src/Contexts/Workouts/shared/database/workouts.repository'

seeder({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        MongoModule,
        UsersDbModule,
        WorkoutsDbModule,
        CommentsDbModule,
    ],
    providers: [WorkoutsRepository],
}).run([UsersSeeder, WorkoutsSeeder, CommentSeeder])
