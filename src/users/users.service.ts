// NestJS
import { Injectable, NotFoundException } from '@nestjs/common'

// TypeORM
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In, IsNull } from 'typeorm'

// Bcrypt
import * as bcrypt from 'bcrypt'

// Entities
import { User } from './entities/user.entity'
import { Workspace } from 'src/workspaces/entities/workspace.entity'
import { Role } from 'src/roles/entities/role.entity'

// DTOs
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		@InjectRepository(Workspace)
		private workspaceRepository: Repository<Workspace>,
		@InjectRepository(Role)
		private roleRepository: Repository<Role>,
	) {}

	async findAll(): Promise<User[]> {
		return this.userRepository.find({
			where: { deletedAt: IsNull() },
		})
	}

	async findById(id: number): Promise<User> {
		const user = await this.userRepository.findOne({
			where: { id, deletedAt: IsNull() },
			relations: ['workspace', 'roles'],
		})

		if (!user) throw new NotFoundException(`User with id #${id} not found`)

		return user
	}

	async createUser(data: CreateUserDto): Promise<User> {
		const user = this.userRepository.create(data)

		const saltRounds = 10
		user.password = await bcrypt.hash(data.password, saltRounds)

		if (data.workspaceId) {
			const workspace = await this.workspaceRepository.findOne({
				where: { id: data.workspaceId },
			})

			if (!workspace)
				throw new NotFoundException(
					`Workspace with id #${data.workspaceId} not found`,
				)

			user.workspace = workspace
		}

		if (data.rolesIds) {
			const roles = await this.roleRepository.find({
				where: { id: In(data.rolesIds) },
			})

			if (roles.length !== data.rolesIds.length)
				throw new NotFoundException(`Roles with ids ${data.rolesIds} not found`)

			user.roles = roles
		}

		return this.userRepository.save(user)
	}

	async updateUser(id: number, changes: UpdateUserDto): Promise<User> {
		if (changes.password) {
			const saltRounds = 10
			changes.password = await bcrypt.hash(changes.password, saltRounds)
		}

		await this.userRepository.update({ id }, { ...changes })
		return this.findById(id)
	}

	async softDelete(id: number): Promise<User> {
		const user = await this.findById(id)
		user.deletedAt = new Date()
		return await this.userRepository.save(user)
	}
}
