// NestJS
import { Injectable, NotFoundException } from '@nestjs/common'

// Class-transformer
import { instanceToPlain } from 'class-transformer'

// TypeORM
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, IsNull } from 'typeorm'

// Entities
import { Pet } from './entities/pet.entity'
import { Owner } from 'src/owners/entities/owner.entity'

// DTOs
import { CreatePetDto, UpdatePetDto } from './dto/pet.dto'

@Injectable()
export class PetsService {
	constructor(
		@InjectRepository(Pet)
		private readonly petRepository: Repository<Pet>,
		@InjectRepository(Owner)
		private readonly ownerRepository: Repository<Owner>,
	) {}

	async findAll(): Promise<Partial<Pet>[]> {
		const pets = await this.petRepository.find({
			where: { deletedAt: IsNull() },
		})

		return pets.map(pet => instanceToPlain(pet))
	}

	async findById(id: number): Promise<Partial<Pet>> {
		const pet = await this.petRepository.findOne({
			where: { id, deletedAt: IsNull() },
			relations: ['owner'],
		})

		if (!pet) throw new NotFoundException(`Pet with id #${id} not found`)

		const petRes = instanceToPlain(pet)

		return petRes
	}

	async createPet(data: CreatePetDto): Promise<Pet> {
		const pet = this.petRepository.create(data)

		if (data.ownerId) {
			const owner = await this.ownerRepository.findOne({
				where: { id: data.ownerId },
			})
			pet.owner = owner
		}

		return await this.petRepository.save(pet)
	}

	async updatePet(id: number, changes: UpdatePetDto): Promise<Partial<Pet>> {
		await this.petRepository.update({ id }, { ...changes })
		return this.findById(id)
	}

	async softDelete(id: number): Promise<Pet> {
		const pet = await this.findById(id)
		pet.deletedAt = new Date()
		return await this.petRepository.save(pet)
	}
}
