import {
    Controller,
    Post,
    Req,
    UnprocessableEntityException,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { ReqPayload } from 'src/Core/infrastructure/@types/express'
import { AccessToken } from 'src/Core/infrastructure/@types/userPayload'

import { JwtProvider } from '../../shared/providers/jwt.service'
import { UploadAvatarService } from '../services/uploadAvatar.service'

const storage = diskStorage({
    destination: './uploads/avatars',
    filename: (_req, file, callback) => {
        const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('')
        const filename = `${randomName}${extname(file.originalname.toLowerCase())}`

        callback(null, filename)
    },
})

const fileFilter = (_req: Express.Request, file: Express.Multer.File, callback: any): any => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return callback(
            new UnprocessableEntityException('Only image files are allowed (jpg|jpeg|png|gif)'),
            false,
        )
    }

    callback(null, true)
}

const limits = {
    fileSize: 128 * 1024, // 128KB
}

@ApiTags('Users')
@Controller('users')
export class UserProfileUpdateAvatarController {
    constructor(
        private readonly uploadAvatarService: UploadAvatarService,
        private readonly jwtProvider: JwtProvider,
    ) {}

    @Post('avatar')
    @UseInterceptors(FileInterceptor('file', { storage, fileFilter, limits }))
    @ApiBearerAuth()
    async execute(
        @UploadedFile() file: Express.Multer.File,
        @Req() req: ReqPayload,
    ): Promise<AccessToken> {
        const user = await this.uploadAvatarService.execute(req.user.id, file)
        const payload = user.toPayload()

        return await this.jwtProvider.signToken(payload)
    }
}
