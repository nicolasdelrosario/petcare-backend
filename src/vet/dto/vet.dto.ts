// Validations
import {
	IsNotEmpty,
	IsNumberString,
	IsOptional,
	IsPhoneNumber,
	IsString,
	Matches,
} from 'class-validator'

// API Documentation
import { ApiProperty, PartialType } from '@nestjs/swagger'

export class CreateVetDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name!: string

	@ApiProperty()
	@IsOptional()
	@IsString()
	address?: string

	@ApiProperty()
	@IsNumberString()
	@IsOptional()
	@IsPhoneNumber('PE')
	@Matches(/^(9|8|7|3)[0-9]{8}$/)
	phone?: string
}

export class UpdateVetDto extends PartialType(CreateVetDto) {}
