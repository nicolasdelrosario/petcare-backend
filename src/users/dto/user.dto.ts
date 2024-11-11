// Validations
import {
	IsNotEmpty,
	IsString,
	IsOptional,
	IsEmail,
	IsPhoneNumber,
	Matches,
	IsNumber,
	IsPositive,
	MinLength,
} from 'class-validator'

// Class-transformer
import { Transform } from 'class-transformer'

// API Documentation
import { ApiProperty, PartialType } from '@nestjs/swagger'

export class CreateUserDto {
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

	@ApiProperty({ description: 'Nombre del usuario' })
	@IsOptional()
	@IsString()
	@Transform(({ value }) => value.trim())
	name: string

	@ApiProperty({ description: 'DNI del usuario' })
	@IsOptional()
	@IsString()
	dni: string

	@ApiProperty({ description: 'Teléfono del usuario' })
	@IsOptional()
	@IsPhoneNumber('PE')
	@Matches(/^(9|8|7|3)[0-9]{8}$/)
	phone: string

	@ApiProperty({ description: 'ID del Workspace del usuario' })
	@IsNotEmpty()
	@IsNumber()
	@IsPositive()
	workspaceId: number
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
