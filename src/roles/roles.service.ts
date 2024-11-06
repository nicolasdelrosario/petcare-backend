// NestJS
import {
	Injectable,
	NotFoundException,
	ConflictException,
} from '@nestjs/common'

// TypeORM
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

// Entities
import { Role } from './entities/role.entity'

// DTOs
import { CreateRoleDto } from './dto/role.dto'

@Injectable()
export class RolesService {
	constructor(
		@InjectRepository(Role)
		private readonly roleRepository: Repository<Role>,
	) {}

	async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
		const { name } = createRoleDto

		const existingRole = await this.roleRepository.findOne({ where: { name } })
		if (existingRole)
			throw new ConflictException(`Role '${name}' already exists.`)

		const role = this.roleRepository.create({ name })
		return this.roleRepository.save(role)
	}

	async findAll(): Promise<Role[]> {
		return this.roleRepository.find()
	}

	async findById(id: number): Promise<Role> {
		const role = await this.roleRepository.findOne({
			where: { id },
		})

		if (!role) throw new NotFoundException(`Role with id #${id} not found`)

		return role
	}
}
