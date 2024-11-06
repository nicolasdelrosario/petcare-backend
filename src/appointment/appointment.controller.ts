import {
	Body,
	Controller,
	Get,
	Post,
	Put,
	Patch,
	Param,
	ParseIntPipe,
} from '@nestjs/common'

// Services
import { AppointmentService } from './appointment.service'

// DTOs
import {
	CreateAppointmentDto,
	UpdateAppointmentDto,
} from './dto/appointment.dto'

// API Documentation
import { ApiTags } from '@nestjs/swagger'

import { Auth } from 'src/user/decorators/auth.decorator'

@ApiTags('Appointments')
@Auth()
@Controller('appointments')
export class AppointmentController {
	constructor(private appointmentService: AppointmentService) {}

	@Get()
	getOwners() {
		return this.appointmentService.findAll()
	}

	@Get(':id')
	getOwner(@Param('id', ParseIntPipe) id: number) {
		return this.appointmentService.findOne(id)
	}

	@Post()
	create(@Body() data: CreateAppointmentDto) {
		return this.appointmentService.create(data)
	}

	@Put(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() changes: UpdateAppointmentDto,
	) {
		return this.appointmentService.update(id, changes)
	}

	@Patch(':id')
	softDeleteUser(@Param('id', ParseIntPipe) id: number) {
		return this.appointmentService.softDelete(id)
	}
}
