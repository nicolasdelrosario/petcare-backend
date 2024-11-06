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
import { Vet } from './entities/vet.entity'

// DTOs
import { CreateVetDto } from './dto/vet.dto'
import { UpdateVetDto } from './dto/vet.dto'

@Injectable()
export class VetService {
	constructor(
		@InjectRepository(Vet)
		private readonly vetRepository: Repository<Vet>,
	) {}

	findAll() {
		return this.vetRepository.find({
			where: { deletedAt: IsNull() },
			relations: ['users'],
		})
	}

	async findOne(id: number): Promise<Vet> {
		return this.findVet(id)
	}

	async create(data: CreateVetDto): Promise<Vet> {
		const vet = this.vetRepository.create(data)
		try {
			return await this.vetRepository.save(vet)
		} catch (error) {
			this.handleError(error)
		}
	}

	async update(id: number, changes: UpdateVetDto): Promise<Vet> {
		await this.findVet(id)
		try {
			await this.vetRepository.update(id, changes)
			return this.findVet(id)
		} catch (error) {
			this.handleError(error)
		}
	}

	async softDelete(id: number): Promise<void> {
		const vet = await this.findVet(id)
		vet.deletedAt = new Date()
		await this.vetRepository.save(vet)
	}

	public async findVet(id: number): Promise<Vet> {
		const vet = await this.vetRepository.findOne({ where: { id } })

		if (!vet) throw new NotFoundException(`Vet with id #${id} wasn't found.`)

		return vet
	}

	private handleError(error: any) {
		if (error.code === '23505') {
			throw new ConflictException('Duplicate field detected.')
		}
		throw new BadRequestException(error.message)
	}
}
