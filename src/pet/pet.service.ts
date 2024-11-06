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
import { OwnerService } from 'src/owner/owner.service'

// Entities
import { Pet } from './entities/pet.entity'

// DTOs
import { CreatePetDto, UpdatePetDto } from './dto/pet.dto'

@Injectable()
export class PetService {
	constructor(
		@InjectRepository(Pet)
		private readonly petRepository: Repository<Pet>,
		private ownersService: OwnerService,
	) {}

	findAll() {
		return this.petRepository.find({
			where: { deletedAt: IsNull() },
			relations: ['owner', 'appointments'],
		})
	}

	async findOne(id: number): Promise<Pet> {
		return this.findPet(id)
	}

	async create(data: CreatePetDto): Promise<Pet> {
		const pet = this.petRepository.create(data)

		if (data.ownerId) {
			const owner = await this.ownersService.findOwner(data.ownerId)
			pet.owner = owner
		}

		try {
			return await this.petRepository.save(pet)
		} catch (error) {
			this.handleError(error)
		}
	}

	async update(id: number, changes: UpdatePetDto): Promise<Pet> {
		await this.findPet(id)
		try {
			await this.petRepository.update(id, changes)
			return this.findPet(id)
		} catch (error) {
			this.handleError(error)
		}
	}

	async softDelete(id: number): Promise<void> {
		const pet = await this.findPet(id)
		pet.deletedAt = new Date()
		await this.petRepository.save(pet)
	}

	public async findPet(id: number): Promise<Pet> {
		const pet = await this.petRepository.findOne({
			relations: ['owner', 'appointments'],
			where: { id },
		})

		if (!pet) throw new NotFoundException(`Pet with id #${id} wasn't found.`)

		return pet
	}

	async findPetWithOwner(id: number): Promise<Pet> {
		const pet = await this.petRepository.findOne({
			where: { id },
			relations: ['owner'],
		})

		if (!pet) {
			throw new NotFoundException(`Pet with id #${id} wasn't found.`)
		}

		return pet
	}

	private handleError(error: any) {
		if (error.code === '23505')
			throw new ConflictException('Duplicate field detected.')

		throw new BadRequestException(error.message)
	}
}
