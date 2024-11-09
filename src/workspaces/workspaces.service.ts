// NestJS
import { Injectable, NotFoundException } from '@nestjs/common'

// TypeORM
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

// Entities
import { Workspace } from './entities/workspace.entity'

// DTOs
import { CreateWorkspaceDto, UpdateWorkspaceDto } from './dto/workspace.dto'

@Injectable()
export class WorkspacesService {
	constructor(
		@InjectRepository(Workspace)
		private readonly workspaceRepository: Repository<Workspace>,
	) {}

	async findAll(): Promise<Workspace[]> {
		return this.workspaceRepository.find()
	}

	async findById(id: number): Promise<Workspace> {
		const workspace = await this.workspaceRepository.findOne({
			where: { id },
			relations: ['users'],
		})

		if (!workspace)
			throw new NotFoundException(`Workspace with id #${id} not found`)

		return workspace
	}

	async create(data: CreateWorkspaceDto): Promise<Workspace> {
		const workspace = this.workspaceRepository.create(data)
		return this.workspaceRepository.save(workspace)
	}

	async update(id: number, changes: UpdateWorkspaceDto): Promise<Workspace> {
		await this.workspaceRepository.update({ id }, { ...changes })
		return this.findById(id)
	}

	async softDelete(id: number): Promise<Workspace> {
		const workspace = await this.findById(id)
		workspace.deletedAt = new Date()
		return this.workspaceRepository.save(workspace)
	}
}
