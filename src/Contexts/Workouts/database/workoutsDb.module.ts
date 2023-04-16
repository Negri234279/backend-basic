import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { WorkoutEntity, WorkoutSchema } from './workout.schema'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: WorkoutEntity.name, schema: WorkoutSchema },
        ]),
    ],
    exports: [
        MongooseModule.forFeature([
            { name: WorkoutEntity.name, schema: WorkoutSchema },
        ]),
    ],
})
export class WorkoutsDbModule {}
