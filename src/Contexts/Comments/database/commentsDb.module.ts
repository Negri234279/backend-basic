import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { CommentEntity, CommentSchema } from './comment.schema'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: CommentEntity.name, schema: CommentSchema },
        ]),
    ],
    exports: [
        MongooseModule.forFeature([
            { name: CommentEntity.name, schema: CommentSchema },
        ]),
    ],
})
export class CommentsDbModule {}
