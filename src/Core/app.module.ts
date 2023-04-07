import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'

import { UsersModule } from '../Contexts/Users/users.module'
import { AppController } from './infrastructure/app.controller'
import configuration, { EnvVar } from './infrastructure/config/configuration'
import { JwtAuthGuard } from './infrastructure/guards/jwtAuth.guard'
import { MongoModule } from './infrastructure/mongo.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        MongoModule,
        UsersModule,
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
        AppModule.port = this.configService.get<number>('APP_PORT')
    }
}
