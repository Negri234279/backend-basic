import { Module, Global } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { EnvVar } from './config/configuration'

@Global()
@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService<EnvVar>) => ({
                secret: configService.get<string>('JWT_TOKEN'),
                signOptions: { expiresIn: '1h', algorithm: 'HS512' },
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [JwtModule],
})
export class JwtGlobalModule {}
