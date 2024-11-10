// Validations
import {
	IsBoolean,
	IsDate,
	IsOptional,
	IsString,
	IsNotEmpty,
	IsNumber,
} from 'class-validator'

// API Documentation
import { ApiProperty, PartialType } from '@nestjs/swagger'

export class CreateAppointmentDto {
	@ApiProperty({
		description: 'Fecha del Appointment en formato YYYY-MM-DD',
		example: '2024-10-10',
	})
	@IsDate()
	@IsNotEmpty()
	date: Date

	@ApiProperty({
		description: 'Hora del Appointment en formato HH:MM:SS',
		example: '14:30:00',
	})
	@IsString()
	@IsNotEmpty()
	time: string

	@ApiProperty({
		description:
			'Estado del Appointment (true para activo, false para cancelado)',
		example: true,
		default: true,
	})
	@IsBoolean()
	@IsOptional()
	status: boolean

	@ApiProperty({
		description: 'Razón de la cita, una descripción opcional',
		example: 'Revisión general',
	})
	@IsString()
	@IsOptional()
	reason: string

	@ApiProperty({
		description: 'ID del pet asociado a la cita',
		example: 1,
	})
	@IsNotEmpty()
	@IsNumber()
	petId: number

	@ApiProperty({
		description: 'ID del usuario que crea o gestiona la cita',
		example: 1,
	})
	@IsNotEmpty()
	@IsNumber()
	userId: number
}

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {}
