import { OmitType, PartialType } from '@nestjs/mapped-types'

import { CreateWorkoutDto } from './createWorkout.dto'

export class UpdateworkoutDto extends PartialType(OmitType(CreateWorkoutDto, ['id'])) {}
