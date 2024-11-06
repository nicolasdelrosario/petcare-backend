// Entities
import { Role } from 'src/roles/entities/role.entity'

export interface JwtPayload {
	readonly sub: number
	readonly username: string
	readonly roles: Role[]
}
