// NestJS
import { Injectable, NotFoundException } from '@nestjs/common'

// TypeORM
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, IsNull } from 'typeorm'

// Class-transformer
import { instanceToPlain } from 'class-transformer'

// Entities
import { Owner } from './entities/owner.entity'

// DTOs
import { CreateOwnerDto, UpdateOwnerDto } from './dto/owner.dto'

@Injectable()
export class OwnersService {
	constructor(
		@InjectRepository(Owner) private ownersRepository: Repository<Owner>,
	) {}

	async findAll(): Promise<Owner[]> {
		return await this.ownersRepository.find({
			where: { deletedAt: IsNull() },
		})
	}

	async findById(id: number): Promise<any> {
		const owner = await this.ownersRepository.findOne({
			where: { id, deletedAt: IsNull() },
			relations: ['pets'],
		})

		if (!owner) throw new NotFoundException('Owner not found')

		const ownerRes = instanceToPlain(owner)

		return ownerRes
	}

	async createOwner(createOwnerDto: CreateOwnerDto): Promise<Owner> {
		const owner = this.ownersRepository.create(createOwnerDto)
		return await this.ownersRepository.save(owner)
	}

	async updateOwner(id: number, changes: UpdateOwnerDto): Promise<Owner> {
		await this.ownersRepository.update({ id }, { ...changes })
		return this.findById(id)
	}

	async softDelete(id: number): Promise<Owner> {
		const owner = await this.findById(id)
		owner.deletedAt = new Date()
		return await this.ownersRepository.save(owner)
	}
}
