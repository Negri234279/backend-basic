import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { Public } from './decorators/public.decorator'

@ApiTags('Health check')
@Controller()
export class AppController {
    @Get()
    @ApiOperation({
        summary: 'Check if the server is running',
        description:
            'This endpoint is used to check if the server is running properly. If the server is running, it will return a void response.',
    })
    @Public()
    healthcheck(): string {
        return 'OK'
    }
}
