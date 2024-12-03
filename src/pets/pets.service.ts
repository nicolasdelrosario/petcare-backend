// NestJS
import { Injectable, NotFoundException } from '@nestjs/common'

// Class-transformer
import { instanceToPlain } from 'class-transformer'

// TypeORM
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

// Entities
import { Pet } from './entities/pet.entity'
import { Owner } from 'src/owners/entities/owner.entity'

// DTOs
import { CreatePetDto, UpdatePetDto } from './dto/pet.dto'

// Interfaces
import { UserActiveI } from 'src/common/interfaces/user-active-interface'

@Injectable()
export class PetsService {
	constructor(
		@InjectRepository(Pet)
		private readonly petRepository: Repository<Pet>,
		@InjectRepository(Owner)
		private readonly ownerRepository: Repository<Owner>,
	) {}

	async findAll(user: UserActiveI) {
		const pets = await this.petRepository.find({
			where: { workspaceId: user.workspaceId },
		})
		return pets.map(pet => instanceToPlain(pet))
	}

	async findOneById(id: number, user: UserActiveI) {
		const pet = await this.findPetById(id, user.workspaceId)
		return instanceToPlain(pet)
	}

	async createPet(data: CreatePetDto, user: UserActiveI) {
		const pet = this.petRepository.create(data)

		if (data.ownerId)
			pet.owner = await this.validateOwner(data.ownerId, user.workspaceId)

		pet.workspaceId = user.workspaceId

		return await this.petRepository.save(pet)
	}

	async updatePet(id: number, updatePetDto: UpdatePetDto, user: UserActiveI) {
		await this.findPetById(id, user.workspaceId)

		return await this.petRepository.update(id, {
			...updatePetDto,
			workspaceId: user.workspaceId,
		})
	}

	async softDelete(id: number, user: UserActiveI) {
		await this.findPetById(id, user.workspaceId)
		return await this.petRepository.softDelete(id)
	}

	private async findPetById(id: number, workspaceId: number) {
		const pet = await this.petRepository.findOne({
			where: { id, workspaceId },
			relations: ['owner', 'appointments'],
		})

		if (!pet) throw new NotFoundException(`Pet with id #${id} not found`)

		return pet
	}

	private async validateOwner(id: number, workspaceId: number) {
		const owner = await this.ownerRepository.findOne({
			where: { id, workspaceId },
		})

		if (!owner) throw new NotFoundException(`Owner with id #${id} not found`)

		return owner
	}
}
