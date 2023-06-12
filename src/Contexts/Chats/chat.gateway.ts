import { ConflictException, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { UserPayload } from 'src/Core/infrastructure/@types/userPayload'

import { UsersRepository } from '../Users/shared/database/users.repository'
import { Chat } from './chat'
import { ChatModel } from './chat.model'
import { ChatRepositoryImpl } from './database/chat.repository'

@WebSocketGateway(3201, {
    cors: { origin: '*' },
    namespace: 'private-chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server

    private logger: Logger = new Logger('CHAT')

    constructor(
        private readonly jwtService: JwtService,
        private readonly chatRepository: ChatRepositoryImpl,
        private readonly usersRepository: UsersRepository,
    ) {}

    async handleConnection(socket: Socket): Promise<void> {
        this.logger.debug(`Client connected: ${socket.id}`)

        const token = this.extractTokenFromHeader(socket)
        if (!token) {
            // throw new UnauthorizedException()
        }

        console.log(token)

        try {
            const payload = await this.jwtService.verifyAsync(token)
            socket.handshake.query['user'] = payload
        } catch {
            // throw new UnauthorizedException()
        }
    }

    async handleDisconnect(socket: Socket): Promise<void> {
        this.logger.debug(`Client disconnected: ${socket.id}`)
    }

    @SubscribeMessage('join-athlete')
    async handleJoinAthleteRoom(client: Socket): Promise<void> {
        const { id } = client.handshake.query['user'] as any as UserPayload
        const athlete = await this.usersRepository.findOne(id)
        if (!athlete) {
            throw new ConflictException()
        }

        client.join(id)

        const messages = await this.chatRepository.find(id, athlete.coach as string, {
            populateUser: true,
        })

        const messagesSerialized = messages.map((chat) => chat.toUsername())

        client.emit('messageHistory', messagesSerialized)

        this.logger.debug(`${athlete.username} Join room ${id}`)
    }

    @SubscribeMessage('join-coach')
    async handleJoinCoachRoom(client: Socket, idAthlete: string): Promise<void> {
        const { id } = client.handshake.query['user'] as any as UserPayload
        const coach = await this.usersRepository.findOne(id)
        if (!coach) {
            throw new ConflictException()
        }

        const athlete = await this.usersRepository.findOne(idAthlete)
        if (!athlete || athlete.coach !== id) {
            throw new ConflictException()
        }

        client.join(idAthlete)

        const messages = await this.chatRepository.find(idAthlete, id, {
            populateUser: true,
        })

        const messagesSerialized = messages.map((chat) => chat.toUsername())

        client.emit('messageHistory', messagesSerialized)

        this.logger.debug(`${coach.username} Join room ${id}`)
    }

    @SubscribeMessage('sendMessage')
    async handleMessage(client: Socket, data: Partial<Chat>): Promise<void> {
        this.logger.debug(`message: ${JSON.stringify(data)}`)

        const room = Array.from(client.rooms.values()).find((r) => r !== client.id)

        const payload = client.handshake.query['user'] as any as UserPayload
        const from = payload.id

        const date = new Date()

        const newMessage = new ChatModel({
            ...data,
            from,
            createdAt: date,
            updatedAt: date,
        } as Chat)

        const messageSaved = await this.chatRepository.save(newMessage)
        const messageSerialized = messageSaved.toUsername()

        console.log('newMessage')
        console.log(newMessage)

        console.log('messageSaved')
        console.log(messageSaved)

        console.log('messageSerialized')
        console.log(messageSerialized)

        this.server.to(room).emit('newMessage', messageSerialized)
    }

    private extractTokenFromHeader(socket: Socket): string | undefined {
        const [type, token] = socket.handshake.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}
