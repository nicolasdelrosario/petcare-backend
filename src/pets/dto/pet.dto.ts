// Validations
import {
	IsBoolean,
	IsDate,
	IsNotEmpty,
	IsNumber,
	IsNumberString,
	IsOptional,
	IsString,
} from 'class-validator'

// API Documentation
import { ApiProperty, PartialType } from '@nestjs/swagger'

export class CreatePetDto {
	@ApiProperty({ description: 'Nombre de la mascota' })
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiProperty()
	@IsOptional()
	@IsString()
	species: string

	@ApiProperty({ description: 'Raza' })
	@IsOptional()
	@IsString()
	breed: string

	@ApiProperty({
		description: 'Sexo de la mascota, true para macho y false para hembra',
		example: true,
		default: true,
	})
	@IsBoolean()
	@IsOptional()
	sex: boolean

	@ApiProperty({ description: 'Peso en kilogramos' })
	@IsNumberString()
	@IsOptional()
	weight: string

	@ApiProperty({ type: Date, description: 'Fecha de nacimiento' })
	@IsDate()
	@IsOptional()
	birthDate: Date

	@ApiProperty({ description: 'Color' })
	@IsOptional()
	@IsString()
	color: string

	@ApiProperty({ description: 'Características' })
	@IsOptional()
	@IsString()
	characteristics: string

	@ApiProperty({ description: 'Estado de la mascota' })
	@IsBoolean()
	@IsOptional()
	isAlive: boolean

	@ApiProperty({ description: 'ID del dueño de la mascota' })
	@IsNotEmpty()
	@IsNumber()
	ownerId: number
}

export class UpdatePetDto extends PartialType(CreatePetDto) {}
