// NestJS
import { Injectable, NotFoundException } from '@nestjs/common'

// TypeORM
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, IsNull } from 'typeorm'

// Entities
import { Appointment } from './entities/appointment.entity'
import { User } from 'src/users/entities/user.entity'
import { Pet } from 'src/pets/entities/pet.entity'

// DTOs
import {
	CreateAppointmentDto,
	UpdateAppointmentDto,
} from './dto/appointment.dto'

@Injectable()
export class AppointmentsService {
	constructor(
		@InjectRepository(Appointment)
		private readonly appointmentRepository: Repository<Appointment>,
		@InjectRepository(User) private readonly userRepository: Repository<User>,
		@InjectRepository(Pet) private readonly petRepository: Repository<Pet>,
	) {}

	async findAll(): Promise<Appointment[]> {
		return await this.appointmentRepository.find({
			where: { deletedAt: IsNull() },
			relations: ['user', 'pet', 'pet.owner'],
		})
	}

	async findById(id: number): Promise<Appointment> {
		const appointment = await this.appointmentRepository.findOne({
			where: { id, deletedAt: IsNull() },
			relations: ['user', 'pet', 'pet.owner'],
		})

		if (!appointment)
			throw new NotFoundException(`Appointment with id #${id} not found`)

		return appointment
	}

	async createAppointment(data: CreateAppointmentDto): Promise<Appointment> {
		const appointment = this.appointmentRepository.create(data)

		if (data.userId) {
			const user = await this.userRepository.findOne({
				where: { id: data.userId },
			})
			appointment.user = user
		}

		if (data.petId) {
			const pet = await this.petRepository.findOne({
				where: { id: data.petId },
			})
			appointment.pet = pet
		}

		return await this.appointmentRepository.save(appointment)
	}

	async updateAppointment(
		id: number,
		changes: UpdateAppointmentDto,
	): Promise<Appointment> {
		await this.appointmentRepository.update({ id }, { ...changes })
		return this.findById(id)
	}

	async softDelete(id: number): Promise<Appointment> {
		const appointment = await this.findById(id)
		appointment.deletedAt = new Date()
		return await this.appointmentRepository.save(appointment)
	}
}
