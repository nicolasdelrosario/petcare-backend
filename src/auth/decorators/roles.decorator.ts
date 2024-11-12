// NestJS
import { SetMetadata } from '@nestjs/common'

// Enums
import { Role } from '../../common/enums/role.enum'

export const ROLES_KEY = 'roles'
export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role)
