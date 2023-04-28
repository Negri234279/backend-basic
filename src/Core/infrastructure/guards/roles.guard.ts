import { UserRole } from 'src/Contexts/Users/userRole'

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { UserPayload } from '../@types/userPayload'
import { ROLES_KEY } from '../decorators/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ])
        if (!requiredRoles) {
            return true
        }

        const { user } = context.switchToHttp().getRequest()
        const { role: roles } = user as UserPayload

        return requiredRoles.some((role) => roles?.includes(role))
    }
}
