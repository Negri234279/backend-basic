import { Model } from 'mongoose'
import { UserModel } from 'src/Contexts/Users/user.model'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CommentModel } from '../comment.model'
import { CommentEntity } from './comment.schema'

@Injectable()
export class CommentsRepository {
    constructor(
        @InjectModel(CommentEntity.name)
        private readonly collection: Model<CommentEntity>,
    ) {}

    async exist(id: string): Promise<boolean> {
        return !!(await this.collection.countDocuments({ _id: id }).exec())
    }

    async findOne(id: string): Promise<CommentModel | null> {
        const commentEntity = await this.collection.findById(id).lean().exec()
        if (!commentEntity) {
            return null
        }

        return this.toDomain(commentEntity)
    }

    async findByWorkout(
        authorId: string,
        workouId: string,
    ): Promise<CommentModel[]> {
        const commentEntities = await this.collection
            .find({ authorId, workouId })
            .lean()
            .exec()

        return commentEntities.map((commentEntity) =>
            this.toDomain(commentEntity),
        )
    }

    async findByWorkoutWithUsername(
        authorId: string,
        workouId: string,
    ): Promise<CommentModel[]> {
        const commentEntities = await this.collection
            .find({ authorId, workouId })
            .populate('authorId')
            .lean()
            .exec()

        return commentEntities.map((commentEntity) =>
            this.toDomain(commentEntity),
        )
    }

    async save(comment: CommentModel): Promise<void> {
        const newComment = this.toPersistance(comment)
        const createdComment = new this.collection(newComment)

        await createdComment.save()
    }

    private toPersistance(commentModel: CommentModel): CommentEntity {
        const commentEntity = new CommentEntity()
        commentEntity._id = commentModel.id
        commentEntity.text = commentModel.text
        commentEntity.authorId = commentModel.authorId as string
        commentEntity.workouId = commentModel.workouId
        commentEntity.createdAt = commentModel.createdAt
        commentEntity.updatedAt = commentModel.updatedAt

        return commentEntity
    }

    private toDomain(commentEntity: CommentEntity): CommentModel {
        const { _id: id, authorId, ...restComment } = commentEntity

        let authorDTO: string | UserModel

        if (typeof authorId === 'string') {
            authorDTO = authorId
        } else {
            authorDTO = new UserModel(
                authorId._id,
                authorId.username,
                authorId.password,
                authorId.email,
                authorId.name,
                authorId.surname,
                authorId.role,
                authorId.createdAt,
                authorId.updatedAt,
                authorId.coach,
            )
        }

        return new CommentModel({ id, authorId: authorDTO, ...restComment })
    }
}
