import { ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import helmet from 'helmet'

import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
    })

    app.enableCors()
    app.use(helmet())

    app.setGlobalPrefix('api')
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    })

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
        }),
    )

    await app.listen(AppModule.port)

    console.log(`Server is running on: ${await app.getUrl()}`)
}
bootstrap()
