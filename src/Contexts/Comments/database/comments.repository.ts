import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserModel } from 'src/Contexts/Users/shared/user.model'

import { CommentRepository } from '../@types/comment.repository'
import { CommentWithUser } from '../@types/commentWithUser'
import { CommentModel } from '../comment.model'
import { CommentEntity } from './comment.schema'

@Injectable()
export class CommentsRepository implements CommentRepository {
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

    async findByWorkout(author: string, workout: string): Promise<CommentModel[]> {
        const commentEntities = await this.collection.find({ author, workout }).lean().exec()

        return commentEntities.map((commentEntity) => this.toDomain(commentEntity))
    }

    async findByWorkoutWithAuthor(workout: string): Promise<CommentWithUser[]> {
        const commentEntities = await this.collection
            .find({ workout })
            .populate('author')
            .lean()
            .exec()

        return commentEntities.map(
            (commentEntity) => this.toDomain(commentEntity) as CommentWithUser,
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
        commentEntity.author = commentModel.author as string
        commentEntity.workout = commentModel.workout
        commentEntity.createdAt = commentModel.createdAt
        commentEntity.updatedAt = commentModel.updatedAt

        return commentEntity
    }

    private toDomain(commentEntity: CommentEntity): CommentModel | CommentWithUser {
        const { _id: id, author, ...restComment } = commentEntity

        let authorDTO: string | UserModel

        if (typeof author === 'string') {
            authorDTO = author

            return new CommentModel({ id, author: authorDTO, ...restComment })
        }

        const { _id: authorId, ...restAuthor } = author
        authorDTO = new UserModel({ id: authorId, ...restAuthor })

        return new CommentModel({ id, author: authorDTO, ...restComment }) as CommentWithUser
    }
}
