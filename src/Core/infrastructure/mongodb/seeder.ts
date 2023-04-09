import { ConfigModule } from '@nestjs/config'
import { seeder } from 'nestjs-seeder'
import { UsersDbModule } from 'src/Contexts/Users/database/usersDb.module'

import { UsersSeeder } from '../../../Contexts/Users/database/users.seeder'
import configuration from '../config/configuration'
import { MongoModule } from './mongo.module'

seeder({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        MongoModule,
        UsersDbModule,
    ],
}).run([UsersSeeder])
