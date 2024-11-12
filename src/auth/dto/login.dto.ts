// Validations
import {
	IsNotEmpty,
	IsString,
	IsEmail,
	Matches,
	MinLength,
} from 'class-validator'

// Class-transformer
import { Transform } from 'class-transformer'

// API Documentation
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
	@ApiProperty({ description: 'Email del usuario' })
	@IsNotEmpty()
	@IsEmail()
	@Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g)
	email: string

	@ApiProperty({ description: 'Contraseña del usuario' })
	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	@Transform(({ value }) => value.trim())
	password: string
}
