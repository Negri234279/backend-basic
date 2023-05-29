import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Seeder } from 'nestjs-seeder'
import { athlete, coach } from 'src/Contexts/Users/shared/database/users.seeder'
import { WorkoutsRepository } from 'src/Contexts/Workouts/shared/database/workouts.repository'
import { workout as workoutId } from 'src/Contexts/Workouts/shared/database/workouts.seeder'
import { v4 as uuidv4 } from 'uuid'

import { Comment } from '../@types/comment'
import { CommentEntity } from './comment.schema'

@Injectable()
export class CommentSeeder implements Seeder {
    constructor(
        @InjectModel(CommentEntity.name)
        private readonly collection: Model<CommentEntity>,
        private readonly workoutsRepository: WorkoutsRepository,
    ) {}

    async seed(): Promise<any> {
        const comments: CommentEntity[] = []

        const athleteId = athlete.id
        const coachId = coach.id

        const workouts = await this.workoutsRepository.findByAthelte(athleteId)

        for (const { id: workoutId } of workouts) {
            const numComments = faker.datatype.number({ min: 1, max: 3 })

            for (let i = 0; i < numComments; i++) {
                const author = Math.random() < 0.5 ? athleteId : coachId

                const newComment = createCommentFactory({
                    author,
                    workout: workoutId,
                })

                comments.push(newComment)
            }
        }

        const newComment = createCommentFactory({
            author: coachId,
        })

        comments.push(newComment)
        comments.push(createCommentFactory())

        return this.collection.insertMany(comments)
    }

    async drop(): Promise<any> {
        return this.collection.deleteMany({})
    }
}

export const comment: Partial<Comment> = {
    id: '03a68345-0a83-4961-a040-f120943673eb',
}

const createCommentFactory = ({
    id = uuidv4(),
    text = faker.lorem.paragraph(),
    author = athlete.id,
    workout = workoutId.id,
    createdAt = faker.date.past(),
    updatedAt = faker.date.between(createdAt, new Date()),
}: Partial<Comment> = {}): CommentEntity => {
    return {
        _id: id,
        text,
        author: author as string,
        workout,
        createdAt,
        updatedAt,
    }
}
