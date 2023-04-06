import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { UsersModule } from '../Contexts/Users/users.module'
import { AppController } from './infrastructure/app.controller'
import configuration, { EnvVar } from './infrastructure/config/configuration'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        UsersModule,
    ],
    controllers: [AppController],
})
export class AppModule {
    static port: number

    constructor(private readonly configService: ConfigService<EnvVar>) {
        AppModule.port = this.configService.get<number>('APP_PORT')
    }
}
