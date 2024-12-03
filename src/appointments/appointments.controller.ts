// NestJS
import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Put,
	ParseIntPipe,
	Delete,
} from '@nestjs/common'

//Auth
import { Auth } from 'src/auth/decorators/auth.decorator'

// Roles
import { Role } from 'src/common/enums/role.enum'

// Services
import { AppointmentsService } from './appointments.service'

// Decorators
import { ActiveUser } from 'src/common/decorators/active-user-decorator'

// Interfaces
import { UserActiveI } from 'src/common/interfaces/user-active-interface'

// DTOs
import {
	CreateAppointmentDto,
	UpdateAppointmentDto,
} from './dto/appointment.dto'

// Decorators
import { ApiTagsAndBearer } from '../common/decorators/api-tags-and-bearer.decorator'

@ApiTagsAndBearer('Appointments')
@Auth(Role.USER)
@Controller('appointments')
export class AppointmentsController {
	constructor(private readonly appointmentsService: AppointmentsService) {}

	// Endpoint para obtener todas las citas
	@Get()
	findAll(@ActiveUser() user: UserActiveI) {
		return this.appointmentsService.findAll(user)
	}

	// Endpoint para obtener una cita por ID
	@Get(':id')
	findById(
		@Param('id', ParseIntPipe) id: number,
		@ActiveUser() user: UserActiveI,
	) {
		return this.appointmentsService.findOneById(id, user)
	}

	// Endpoint para crear una nueva cita
	@Post()
	create(
		@Body() createAppointmentDto: CreateAppointmentDto,
		@ActiveUser() user: UserActiveI,
	) {
		return this.appointmentsService.createAppointment(
			createAppointmentDto,
			user,
		)
	}

	// Endpoint para actualizar una cita existente
	@Put(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateAppointmentDto: UpdateAppointmentDto,
		@ActiveUser() user: UserActiveI,
	) {
		return this.appointmentsService.updateAppointment(
			id,
			updateAppointmentDto,
			user,
		)
	}

	// Endopoint para eliminar una cita
	@Delete(':id')
	delete(
		@Param('id', ParseIntPipe) id: number,
		@ActiveUser() user: UserActiveI,
	) {
		return this.appointmentsService.softDelete(id, user)
	}
}
