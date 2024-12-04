// NestJS
import { Injectable, NotFoundException } from '@nestjs/common'

// Class-transformer
import { instanceToPlain } from 'class-transformer'

// TypeORM
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

// Entities
import { Appointment } from './entities/appointment.entity'
import { User } from 'src/users/entities/user.entity'
import { Pet } from 'src/pets/entities/pet.entity'

// DTOs
import {
	CreateAppointmentDto,
	UpdateAppointmentDto,
} from './dto/appointment.dto'

// Interfaces
import { UserActiveI } from 'src/common/interfaces/user-active-interface'

@Injectable()
export class AppointmentsService {
	constructor(
		@InjectRepository(Appointment)
		private readonly appointmentRepository: Repository<Appointment>,
		@InjectRepository(User) private readonly userRepository: Repository<User>,
		@InjectRepository(Pet) private readonly petRepository: Repository<Pet>,
	) {}

	async findAll(user: UserActiveI) {
		const appointments = await this.appointmentRepository.find({
			where: { workspaceId: user.workspaceId },
			relations: ['user', 'pet', 'pet.owner'],
		})

		return appointments.map(appointment => instanceToPlain(appointment))
	}

	async findOneById(id: number, user: UserActiveI) {
		return this.findAppointmentById(id, user.workspaceId)
	}

	async createAppointment(
		createAppointmentDto: CreateAppointmentDto,
		user: UserActiveI,
	) {
		const appointment = this.appointmentRepository.create({
			...createAppointmentDto,
			workspaceId: user.workspaceId,
		})

		if (createAppointmentDto.userId)
			appointment.user = await this.findUserById(
				createAppointmentDto.userId,
				user.workspaceId,
			)

		if (createAppointmentDto.petId)
			appointment.pet = await this.findPetById(
				createAppointmentDto.petId,
				user.workspaceId,
			)

		return this.appointmentRepository.save(appointment)
	}

	async updateAppointment(
		id: number,
		updateAppointmentDto: UpdateAppointmentDto,
		user: UserActiveI,
	) {
		const appointment = await this.findAppointmentById(id, user.workspaceId)

		if (updateAppointmentDto.userId)
			appointment.user = await this.findUserById(
				updateAppointmentDto.userId,
				user.workspaceId,
			)

		if (updateAppointmentDto.petId)
			appointment.pet = await this.findPetById(
				updateAppointmentDto.petId,
				user.workspaceId,
			)

		return await this.appointmentRepository.update(id, {
			...updateAppointmentDto,
			workspaceId: user.workspaceId,
		})
	}

	async softDelete(id: number, user: UserActiveI) {
		await this.findAppointmentById(id, user.workspaceId)
		await this.appointmentRepository.softRemove({ id })
	}

	private async findAppointmentById(id, workspaceId: number) {
		const appointment = await this.appointmentRepository.findOne({
			where: { id, workspaceId },
			relations: ['user', 'pet', 'pet.owner'],
		})

		if (!appointment)
			throw new NotFoundException(`Appointment with id #${id} not found`)

		return appointment
	}

	private async findUserById(id: number, workspaceId: number) {
		const user = await this.userRepository.findOne({
			where: { id, workspace: { id: workspaceId } },
		})

		if (!user) throw new NotFoundException(`User with id #${id} not found`)

		return user
	}

	private async findPetById(id: number, workspaceId: number) {
		const pet = await this.petRepository.findOne({
			where: { id, workspaceId },
			relations: ['owner'],
		})

		if (!pet) {
			throw new NotFoundException(`Pet with id #${id} not found`)
		}

		return pet
	}
}
