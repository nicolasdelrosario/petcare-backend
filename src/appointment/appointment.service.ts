// NestJS
import {
	Injectable,
	NotFoundException,
	ConflictException,
	BadRequestException,
} from '@nestjs/common'

// TypeORM
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'

// Services
import { PetService } from 'src/pet/pet.service'
import { UserService } from 'src/user/user.service'

// Entities
import { Appointment } from './entities/appointment.entity'

// DTOs
import {
	CreateAppointmentDto,
	UpdateAppointmentDto,
} from './dto/appointment.dto'

@Injectable()
export class AppointmentService {
	constructor(
		@InjectRepository(Appointment)
		private readonly appointmentRepository: Repository<Appointment>,
		private petService: PetService,
		private userService: UserService,
	) {}

	findAll() {
		return this.appointmentRepository.find({
			where: { deletedAt: IsNull() },
			relations: ['pet', 'pet.owner', 'user', 'veterinarian'],
		})
	}

	async findOne(id: number): Promise<Appointment> {
		return this.findAppointment(id)
	}

	async create(data: CreateAppointmentDto): Promise<Appointment> {
		const appointment = this.appointmentRepository.create(data)

		if (data.petId) {
			const pet = await this.petService.findPetWithOwner(data.petId)
			appointment.pet = pet
		}

		if (data.userId) {
			const user = await this.userService.findUser(data.userId)
			appointment.user = user
		}

		try {
			return await this.appointmentRepository.save(appointment)
		} catch (error) {
			this.handleError(error)
		}
	}

	async update(
		id: number,
		changes: UpdateAppointmentDto,
	): Promise<Appointment> {
		await this.findAppointment(id)
		try {
			await this.appointmentRepository.update(id, changes)
			return this.findAppointment(id)
		} catch (error) {
			this.handleError(error)
		}
	}

	async softDelete(id: number): Promise<void> {
		const appointment = await this.findAppointment(id)
		appointment.deletedAt = new Date()
		await this.appointmentRepository.save(appointment)
	}

	private async findAppointment(id: number): Promise<Appointment> {
		const appointment = await this.appointmentRepository.findOne({
			where: { id },
			relations: ['pet', 'pet.owner', 'user'],
		})

		if (!appointment)
			throw new NotFoundException(`Appointment with id #${id} wasn't found.`)

		return appointment
	}

	private handleError(error: any) {
		if (error.code === '23505')
			throw new ConflictException('Duplicate field detected.')

		throw new BadRequestException(error.message)
	}
}
