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

// Entities
import { Veterinarian } from './entities/veterinarian.entity'

// DTOs
import {
	CreateVeterinarianDto,
	UpdateVeterinarianDto,
} from './dto/veterinarian.dto'

@Injectable()
export class VeterinarianService {
	constructor(
		@InjectRepository(Veterinarian)
		private readonly veterinarianRepository: Repository<Veterinarian>,
	) {}

	findAll() {
		return this.veterinarianRepository.find({
			where: { deletedAt: IsNull() },
			relations: ['appointments'],
		})
	}

	async findOne(id: number): Promise<Veterinarian> {
		return this.findVeterinarian(id)
	}

	async create(data: CreateVeterinarianDto): Promise<Veterinarian> {
		const veterinarian = this.veterinarianRepository.create(data)
		try {
			return await this.veterinarianRepository.save(veterinarian)
		} catch (error) {
			this.handleError(error)
		}
	}

	async update(
		id: number,
		changes: UpdateVeterinarianDto,
	): Promise<Veterinarian> {
		await this.findVeterinarian(id)
		try {
			await this.veterinarianRepository.update(id, changes)
			return this.findVeterinarian(id)
		} catch (error) {
			this.handleError(error)
		}
	}

	async softDelete(id: number): Promise<void> {
		const veterinarian = await this.findVeterinarian(id)
		veterinarian.deletedAt = new Date()
		await this.veterinarianRepository.save(veterinarian)
	}

	public async findVeterinarian(id: number): Promise<Veterinarian> {
		const veterinarian = await this.veterinarianRepository.findOne({
			relations: ['appointments'],
			where: { id },
		})

		if (!veterinarian)
			throw new NotFoundException(`Veterinarian with id #${id} wasn't found.`)

		return veterinarian
	}

	private handleError(error: any) {
		if (error.code === '23505')
			throw new ConflictException('Duplicate field detected.')

		throw new BadRequestException(error.message)
	}
}
