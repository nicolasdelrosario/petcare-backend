// NestJS
import {
	Controller,
	Get,
	Post,
	Patch,
	Body,
	Param,
	Put,
	ParseIntPipe,
} from '@nestjs/common'

// Services
import { AppointmentsService } from './appointments.service'

// Entities
import { Appointment } from './entities/appointment.entity'

// DTOs
import {
	CreateAppointmentDto,
	UpdateAppointmentDto,
} from './dto/appointment.dto'

// Api Documentation
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
	constructor(private readonly appointmentsService: AppointmentsService) {}

	// Endpoint para obtener todas las citas
	@Get()
	findAll(): Promise<Appointment[]> {
		return this.appointmentsService.findAll()
	}

	// Endpoint para obtener una cita por ID
	@Get(':id')
	findById(@Param('id', ParseIntPipe) id: number): Promise<Appointment> {
		return this.appointmentsService.findById(id)
	}

	// Endpoint para crear una nueva cita
	@Post()
	create(@Body() data: CreateAppointmentDto): Promise<Appointment> {
		return this.appointmentsService.createAppointment(data)
	}

	// Endpoint para actualizar una cita existente
	@Put(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() changes: UpdateAppointmentDto,
	): Promise<Appointment> {
		return this.appointmentsService.updateAppointment(id, changes)
	}

	// Endopoint para eliminar una cita
	@Patch(':id')
	delete(@Param('id', ParseIntPipe) id: number): Promise<Appointment> {
		return this.appointmentsService.softDelete(id)
	}
}
