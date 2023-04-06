import type { UserPayload } from './userPayload'

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload
        }
    }
}

export interface ReqPayload {
    user?: UserPayload
}
