import { ApiProperty, PartialType } from '@nestjs/swagger'

import {
	IsNotEmpty,
	IsString,
	IsNumberString,
	IsEmail,
	IsOptional,
	Matches,
	IsPhoneNumber,
} from 'class-validator'

export class CreateVeterinarianDto {
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
	@IsNotEmpty()
	@IsNumberString()
	@IsPhoneNumber('PE')
	@Matches(/^(9|8|7|3)[0-9]{8}$/)
	phone!: string
}

export class UpdateVeterinarianDto extends PartialType(CreateVeterinarianDto) {}
