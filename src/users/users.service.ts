// NestJS
import { Injectable, NotFoundException } from '@nestjs/common'

// TypeORM
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, IsNull } from 'typeorm'

// Bcrypt
import * as bcrypt from 'bcryptjs'

// Entities
import { User } from './entities/user.entity'
import { Workspace } from 'src/workspaces/entities/workspace.entity'

// DTOs
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectRepository(Workspace)
		private readonly workspaceRepository: Repository<Workspace>,
	) {}

	findOneByEmail(email: string) {
		return this.userRepository.findOneBy({ email })
	}

	async findByEmailWithPassword(email: string): Promise<User> {
		const user = await this.userRepository.findOne({
			where: { email, deletedAt: IsNull() },
			select: ['id', 'name', 'email', 'password', 'role'],
			relations: ['workspace'],
		})

		if (!user) throw new NotFoundException(`User with email ${email} not found`)

		return user
	}

	async findAll(): Promise<User[]> {
		return this.userRepository.find({
			where: { deletedAt: IsNull() },
			relations: ['workspace'],
		})
	}

	async findById(id: number): Promise<User> {
		const user = await this.userRepository.findOne({
			where: { id, deletedAt: IsNull() },
			relations: ['workspace'],
		})

		if (!user) throw new NotFoundException(`User with id #${id} not found`)

		return user
	}

	async createUser(createUserDto: CreateUserDto): Promise<User> {
		const user = this.userRepository.create(createUserDto)

		if (createUserDto.workspaceId) {
			const workspace = await this.workspaceRepository.findOne({
				where: { id: createUserDto.workspaceId },
			})

			if (!workspace)
				throw new NotFoundException(
					`Workspace with id #${createUserDto.workspaceId} not found`,
				)

			user.workspace = workspace
		}

		return this.userRepository.save(user)
	}

	async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
		if (updateUserDto.password)
			updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10)

		await this.userRepository.update({ id }, { ...updateUserDto })
		return this.findById(id)
	}

	async remove(id: number) {
		return await this.userRepository.softRemove({ id })
	}
}
