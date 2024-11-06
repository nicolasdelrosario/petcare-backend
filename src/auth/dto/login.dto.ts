// Validations
import { IsString, IsNotEmpty } from 'class-validator'

export class LoginDto {
	@IsString()
	@IsNotEmpty()
	readonly email: string

	@IsString()
	@IsNotEmpty()
	readonly password: string
}
