// Validations
import {
	IsEmail,
	IsNotEmpty,
	IsNumberString,
	IsOptional,
	IsPhoneNumber,
	IsString,
	Matches,
} from 'class-validator'

// API Documentation
import { ApiProperty, PartialType } from '@nestjs/swagger'

export class CreateOwnerDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name!: string

	@ApiProperty()
	@IsNumberString()
	@IsOptional()
	@IsString()
	dni?: string

	@ApiProperty()
	@IsEmail()
	@IsOptional()
	@Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g)
	email?: string

	@ApiProperty()
	@IsOptional()
	@IsString()
	address?: string

	@ApiProperty()
	@IsNotEmpty()
	@IsNumberString()
	@IsPhoneNumber('PE')
	@Matches(/^(9|8|7|3)[0-9]{8}$/)
	phone!: string
}

export class UpdateOwnerDto extends PartialType(CreateOwnerDto) {}
