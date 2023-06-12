import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ChatEntity } from './chat.schema'
import { ChatModel } from '../chat.model'

@Injectable()
export class ChatRepositoryImpl {
    constructor(
        @InjectModel(ChatEntity.name)
        private readonly collection: Model<ChatEntity>,
    ) {}

    async find(
        idAthlete: string,
        idCoach: string,
        options: {
            populateUser?: boolean
        } = {},
    ): Promise<ChatModel[]> {
        const query = this.collection.find({
            $or: [
                { from: idAthlete, to: idCoach },
                { from: idCoach, to: idAthlete },
            ],
        })

        if (options?.populateUser) {
            query.populate('from')
            query.populate('to')
        }

        const chats = await query.sort({ date: 1 }).exec()

        return chats.map((chat) => ChatModel.toDomain(chat))
    }

    async save(chat: ChatModel): Promise<ChatModel> {
        const newChat = chat.toPersistence()
        const createdChat = await this.collection.create(newChat)

        const populatedChat = await createdChat.populate('from to')
        return ChatModel.toDomain(populatedChat)
    }
}
