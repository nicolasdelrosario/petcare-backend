// NestJS
import { applyDecorators, UseGuards } from '@nestjs/common'

// Decorators
import { Roles } from '../decorators/roles.decorator'

// Guards
import { AuthGuard } from '../guard/auth.guard'
import { RolesGuard } from '../guard/roles.guard'

// Enums
import { Role } from '../../common/enums/role.enum'

export function Auth(role: Role) {
	return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard))
}
