import { ConflictException, Injectable } from '@nestjs/common'
import { unlink } from 'fs/promises'

import { DEFAULT_AVATAR } from '../../shared/constants/defaultAvatar'
import { UsersRepository } from '../../shared/database/users.repository'
import { UserModel } from '../../shared/user.model'
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

        if (user.avatar !== DEFAULT_AVATAR) {
            try {
                const path = join(process.cwd(), 'uploads', 'avatars', user.avatar)
                await unlink(path)
            } catch (error) {
                console.error(`UploadAvatarService: ${error.message}`)
            }
        }

        return updateUser
    }
}
