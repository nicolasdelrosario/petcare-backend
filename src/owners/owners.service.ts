// NestJS
import { Injectable, NotFoundException } from '@nestjs/common'

// TypeORM
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

// Class-transformer
import { instanceToPlain } from 'class-transformer'

// Entities
import { Owner } from './entities/owner.entity'

// DTOs
import { CreateOwnerDto, UpdateOwnerDto } from './dto/owner.dto'

// Interfaces
import { UserActiveI } from 'src/common/interfaces/user-active-interface'

@Injectable()
export class OwnersService {
	constructor(
		@InjectRepository(Owner) private ownerRepository: Repository<Owner>,
	) {}

	async findAll(user: UserActiveI) {
		return await this.ownerRepository.find({
			where: { workspaceId: user.workspaceId },
		})
	}

	async findOneById(id: number, user: UserActiveI) {
		const owner = await this.findOwnerById(id, user.workspaceId)
		return instanceToPlain(owner)
	}

	async createOwner(createOwnerDto: CreateOwnerDto, user: UserActiveI) {
		const owner = this.ownerRepository.create(createOwnerDto)

		owner.workspaceId = user.workspaceId

		return await this.ownerRepository.save(owner)
	}

	async updateOwner(
		id: number,
		updateOwnerDto: UpdateOwnerDto,
		user: UserActiveI,
	) {
		await this.findOwnerById(id, user.workspaceId)

		return await this.ownerRepository.update(id, {
			...updateOwnerDto,
			workspaceId: user.workspaceId,
		})
	}

	async softDelete(id: number, user: UserActiveI) {
		await this.findOwnerById(id, user.workspaceId)
		return await this.ownerRepository.softDelete(id)
	}

	private async findOwnerById(id: number, workspaceId: number): Promise<Owner> {
		const owner = await this.ownerRepository.findOne({
			where: { id, workspaceId },
			relations: ['pets'],
		})

		if (!owner) throw new NotFoundException('Owner not found')

		return owner
	}
}
