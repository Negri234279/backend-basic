import { ConflictException, Logger, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import {
    ConnectedSocket,
    MessageBody,
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

@WebSocketGateway({
    cors: { origin: '*' },
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

    async handleConnection(@ConnectedSocket() client: Socket): Promise<void> {
        const token = this.extractTokenFromHeader(client)
        if (!token) {
            throw new UnauthorizedException()
        }

        try {
            const payload = await this.jwtService.verifyAsync(token)
            client.handshake.query['user'] = payload
        } catch {
            throw new UnauthorizedException()
        }

        this.logger.debug(`Client connected: ${client.id}`)
    }

    async handleDisconnect(@ConnectedSocket() client: Socket): Promise<void> {
        this.logger.debug(`Client disconnected: ${client.id}`)
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
    async handleJoinCoachRoom(
        @ConnectedSocket() client: Socket,
        @MessageBody() idAthlete: string,
    ): Promise<void> {
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
    async handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: Partial<Chat>,
    ): Promise<void> {
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

        this.server.to(room).emit('newMessage', messageSerialized)
    }

    private extractTokenFromHeader(socket: Socket): string | undefined {
        const [type, token] = socket.handshake.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}
