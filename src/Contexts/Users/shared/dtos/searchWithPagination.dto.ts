import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PaginationDto } from 'src/Core/infrastructure/dtos/pagination.dto'

export class SearchWithPaginationDto extends PaginationDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly search: string
}
