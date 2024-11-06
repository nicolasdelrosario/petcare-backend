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
import { Owner } from './entities/owner.entity'

// DTOs
import { CreateOwnerDto } from './dto/owner.dto'
import { UpdateOwnerDto } from './dto/owner.dto'

@Injectable()
export class OwnerService {
	constructor(
		@InjectRepository(Owner)
		private readonly ownerRepository: Repository<Owner>,
	) {}

	findAll() {
		return this.ownerRepository.find({
			where: { deletedAt: IsNull() },
			relations: ['pets'],
		})
	}

	async findOne(id: number): Promise<Owner> {
		return this.findOwner(id)
	}

	async create(data: CreateOwnerDto): Promise<Owner> {
		const owner = this.ownerRepository.create(data)
		try {
			return await this.ownerRepository.save(owner)
		} catch (error) {
			this.handleError(error)
		}
	}

	async update(id: number, changes: UpdateOwnerDto): Promise<Owner> {
		await this.findOwner(id)
		try {
			await this.ownerRepository.update(id, changes)
			return this.findOwner(id)
		} catch (error) {
			this.handleError(error)
		}
	}

	async softDelete(id: number): Promise<void> {
		const owner = await this.findOwner(id)
		owner.deletedAt = new Date()
		await this.ownerRepository.save(owner)
	}

	public async findOwner(id: number): Promise<Owner> {
		const owner = await this.ownerRepository.findOne({
			relations: ['pets'],
			where: { id },
		})

		if (!owner)
			throw new NotFoundException(`Owner with id #${id} wasn't found.`)

		return owner
	}

	private handleError(error: any) {
		if (error.code === '23505')
			throw new ConflictException('Duplicate field detected.')

		throw new BadRequestException(error.message)
	}
}
