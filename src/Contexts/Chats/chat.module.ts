import { Module } from '@nestjs/common'

import { ChatGateway } from './chat.gateway'
import { ChatsDbModule } from './database/chatsDb.module'
import { ChatRepositoryImpl } from './database/chat.repository'
import { UsersDbModule } from '../Users/shared/database/usersDb.module'
import { UsersRepository } from '../Users/shared/database/users.repository'

@Module({
    imports: [ChatsDbModule, UsersDbModule],
    providers: [ChatRepositoryImpl, ChatGateway, UsersRepository],
})
export class ChatModule {}
