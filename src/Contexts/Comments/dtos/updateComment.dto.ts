import { IsNotEmpty, IsString } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class UpdateCommentDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    text: string
}
