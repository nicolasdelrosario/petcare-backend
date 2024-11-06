// Validations
import {
	IsBoolean,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator'

// API Documentation
import { ApiProperty, PartialType } from '@nestjs/swagger'

export class CreatePetDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name!: string

	@ApiProperty()
	@IsOptional()
	@IsString()
	type?: string

	@ApiProperty()
	@IsBoolean()
	@IsOptional()
	gender?: boolean

	@ApiProperty()
	@IsOptional()
	@IsString()
	weight?: string

	@ApiProperty()
	@IsOptional()
	@IsString()
	age?: string

	@ApiProperty()
	@IsOptional()
	@IsString()
	color?: string

	@ApiProperty()
	@IsOptional()
	@IsString()
	characteristics?: string

	@ApiProperty()
	@IsBoolean()
	@IsOptional()
	isAlive?: boolean

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	ownerId!: number
}

export class UpdatePetDto extends PartialType(CreatePetDto) {}
