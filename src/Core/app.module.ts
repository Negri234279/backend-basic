import { MiddlewareConsumer, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { CommentsModule } from 'src/Contexts/Comments/comments.module'
import { WorkoutsModule } from 'src/Contexts/Workouts/workouts.module'

import { UsersModule } from '../Contexts/Users/users.module'
import { AppController } from './infrastructure/app.controller'
import configuration, { EnvVar } from './infrastructure/config/configuration'
import { JwtAuthGuard } from './infrastructure/guards/jwtAuth.guard'
import { LoggingMiddleware } from './infrastructure/middleware/logger.middleware'
import { MongoModule } from './infrastructure/mongodb/mongo.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        MongoModule,
        UsersModule,
        WorkoutsModule,
        CommentsModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
    controllers: [AppController],
})
export class AppModule {
    static port: number

    constructor(private readonly configService: ConfigService<EnvVar>) {
        AppModule.port = this.configService.get<number>('PORT')
    }

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggingMiddleware).forRoutes('*')
    }
}
