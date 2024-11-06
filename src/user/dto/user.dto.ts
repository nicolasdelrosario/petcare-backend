// Validations
import {
	IsNotEmpty,
	IsNumber,
	IsPositive,
	IsString,
	IsPhoneNumber,
	IsEmail,
	IsOptional,
	Matches,
	MinLength,
} from 'class-validator'

// API Documentation
import { ApiProperty, PartialType } from '@nestjs/swagger'

export class CreateUserDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
	name?: string

	@ApiProperty()
	@IsString()
	@IsOptional()
	dni?: string

	@ApiProperty()
	@IsEmail()
	@Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g)
	email!: string

	@ApiProperty()
	@IsPhoneNumber('PE')
	@Matches(/^(9|8|7|3)[0-9]{8}$/)
	@IsOptional()
	phone?: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	password!: string

	@ApiProperty()
	@IsNumber()
	@IsPositive()
	@IsNotEmpty()
	vetId!: number
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
