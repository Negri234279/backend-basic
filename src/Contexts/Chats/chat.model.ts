import { UserModel } from '../Users/shared/user.model'
import { Chat } from './chat'
import { ChatEntity } from './database/chat.schema'

export class ChatModel implements Chat {
    public id: string
    public text: string
    public from: string | UserModel
    public to: string | UserModel
    public date: Date
    public createdAt: Date
    public updatedAt: Date

    constructor(props: Chat) {
        this.id = props.id
        this.text = props.text
        this.from = props.from
        this.to = props.to
        this.date = props.date
        this.createdAt = props.createdAt
        this.updatedAt = props.updatedAt
    }

    public toUsername(): ChatModel {
        const { from, to, ...restChat } = this

        const fromDTO: UserModel | string = typeof from === 'string' ? from : from.username
        const toDTO: UserModel | string = typeof to === 'string' ? to : to.username

        return new ChatModel({
            ...restChat,
            from: fromDTO,
            to: toDTO,
        })
    }

    public static toDomain(chat: ChatEntity): ChatModel {
        const { _id, text, from, to, date, createdAt, updatedAt } = chat

        return new ChatModel({
            id: _id,
            text,
            from,
            to,
            date,
            createdAt,
            updatedAt,
        })
    }

    public toPersistence(): ChatEntity {
        const { id, text, from, to, date, createdAt, updatedAt } = this

        const fromDTO = typeof from === 'string' ? from : from.id
        const toDTO = typeof to === 'string' ? to : to.id

        const chatEntity = new ChatEntity()
        chatEntity._id = id
        chatEntity.text = text
        chatEntity.from = fromDTO
        chatEntity.to = toDTO
        chatEntity.date = date
        chatEntity.createdAt = createdAt
        chatEntity.updatedAt = updatedAt

        return chatEntity
    }
}
