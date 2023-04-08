import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('Health check')
@Controller()
export class AppController {
    @Get()
    @ApiOperation({
        summary: 'Check if the server is running',
        description:
            'This endpoint is used to check if the server is running properly. If the server is running, it will return a void response.',
    })
    healthcheck(): void {
        return
    }
}
