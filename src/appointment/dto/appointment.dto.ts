// Validations
import {
	IsNotEmpty,
	IsNumber,
	IsPositive,
	IsString,
	IsOptional,
	IsDate,
	IsBoolean,
} from 'class-validator'

import { Type } from 'class-transformer'

// API Documentation
import { ApiProperty, PartialType } from '@nestjs/swagger'

export class CreateAppointmentDto {
	@ApiProperty()
	@IsDate()
	@IsNotEmpty()
	@Type(() => Date)
	date: Date

	@ApiProperty()
	@IsBoolean()
	@IsOptional()
	status: boolean

	@ApiProperty()
	@IsString()
	@IsOptional()
	reason?: string

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	petId!: number

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	userId!: number
}

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {}
