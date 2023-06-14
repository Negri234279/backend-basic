import { ConflictException, Injectable } from '@nestjs/common'

import { UsersRepository } from '../../shared/database/users.repository'
import { UserModel } from '../../shared/user.model'
import { unlink } from 'fs/promises'
import { join } from 'path'

@Injectable()
export class UploadAvatarService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(id: string, file: Express.Multer.File): Promise<UserModel> {
        const user = await this.usersRepository.findOne(id)
        if (!user) {
            throw new ConflictException()
        }

        const avatar = file.filename

        const updateUser = new UserModel({ ...user, avatar })

        await this.usersRepository.update(updateUser)

        if (user.avatar !== 'default.png') {
            const path = join('uploads', 'avatars', user.avatar)
            await unlink(path)
        }

        return updateUser
    }
}
