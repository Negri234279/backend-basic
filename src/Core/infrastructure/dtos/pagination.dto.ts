import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, Min } from 'class-validator'

export class PaginationDto {
    @ApiProperty({ example: 1, minimum: 1 })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    readonly page: number = 1

    @ApiProperty({ example: 10, minimum: 1 })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    readonly limit: number = 10
}
