import { UserAddCoachRoleService } from './addCoachRole.service'
import { UserCoachesListService } from './coachesList.service'
import { UserRemoveCoachRoleService } from './removeCoachRole.service'

export const UserCoachServices = [
    UserAddCoachRoleService,
    UserRemoveCoachRoleService,
    UserCoachesListService,
]
