// NestJS
import {
	Injectable,
	NotFoundException,
	BadRequestException,
} from '@nestjs/common'

// TypeORM
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

// Bcrypt
import * as bcrypt from 'bcryptjs'

// Entities
import { User } from './entities/user.entity'
import { Workspace } from 'src/workspaces/entities/workspace.entity'

// DTOs
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'

// Interfaces
import { UserActiveI } from 'src/common/interfaces/user-active-interface'

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
			where: { email },
			select: ['id', 'name', 'email', 'password', 'role'],
			relations: ['workspace'],
		})

		if (!user) throw new NotFoundException(`User with email ${email} not found`)

		return user
	}

	async findAll(user: UserActiveI) {
		return await this.userRepository.find({
			where: { workspace: { id: user.workspaceId } },
			relations: ['workspace'],
		})
	}

	async findOneById(id: number, user: UserActiveI) {
		return await this.findUserById(id, user.workspaceId)
	}

	async createUser(createUserDto: CreateUserDto, user?: UserActiveI) {
		const newUser = this.userRepository.create({
			...createUserDto,
		})

		const workspaceId = createUserDto.workspaceId || user?.workspaceId
		if (!workspaceId) {
			throw new BadRequestException('Workspace ID is required')
		}

		const workspace = await this.findWorkspaceById(workspaceId)
		newUser.workspace = workspace

		return this.userRepository.save(newUser)
	}

	async updateUser(
		id: number,
		updateUserDto: UpdateUserDto,
		user: UserActiveI,
	) {
		await this.findUserById(id, user.workspaceId)

		if (updateUserDto.password)
			updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10)

		return this.userRepository.update(id, { ...updateUserDto })
	}

	async remove(id: number, user: UserActiveI) {
		await this.findUserById(id, user.workspaceId)
		await this.userRepository.softRemove({ id })
	}

	private async findUserById(id: number, workspaceId: number) {
		const user = await this.userRepository.findOne({
			where: { id, workspace: { id: workspaceId } },
			relations: ['workspace'],
		})

		if (!user) throw new NotFoundException(`User with id #${id} not found`)

		return user
	}

	private async findWorkspaceById(workspaceId: number) {
		const workspace = await this.workspaceRepository.findOne({
			where: { id: workspaceId },
		})

		if (!workspace)
			throw new NotFoundException(`Workspace with id #${workspaceId} not found`)

		return workspace
	}
}
