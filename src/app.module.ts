import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config'
import configuration, { EnvVar } from './configuration'
import { ConfigService } from '@nestjs/config'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
    ],
    controllers: [AppController],
})
export class AppModule {
    static port: number

    constructor(private readonly configService: ConfigService<EnvVar>) {
        AppModule.port = this.configService.get<number>('APP_PORT')
    }
}
