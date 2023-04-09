import { Module, Global } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { EnvVar } from '../config/configuration'

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async (configService: ConfigService<EnvVar>) => ({
                uri: configService.get<string>('MONGODB_URI'),
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [MongooseModule],
})
export class MongoModule {}
