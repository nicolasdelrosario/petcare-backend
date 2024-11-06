// Validations
import {
	IsNotEmpty,
	IsString,
	IsEmail,
	Matches,
	MinLength,
} from 'class-validator'

// API Documentation
import { ApiProperty } from '@nestjs/swagger'

export class LoginUserDto {
	@ApiProperty()
	@IsEmail()
	@Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g)
	email: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	password: string
}
