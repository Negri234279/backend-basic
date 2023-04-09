import { Prop } from '@nestjs/mongoose'

export class BaseEntity {
    @Prop({ required: true, _id: false })
    _id: string

    @Prop({ type: Date })
    createdAt: Date

    @Prop({ type: Date })
    updatedAt: Date
}
