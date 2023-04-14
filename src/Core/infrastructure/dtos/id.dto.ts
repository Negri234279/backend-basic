// eslint-disable-next-line prettier/prettier
import { IsNotEmpty, IsUUID } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class IdDto {
    @ApiProperty({ type: 'string', format: 'uuid' })
    @IsUUID()
    @IsNotEmpty()
    id: string
}
