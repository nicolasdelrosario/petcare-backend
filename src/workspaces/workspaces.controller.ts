// NestJS
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common'

// Services
import { WorkspacesService } from './workspaces.service'

// DTOs
import { CreateWorkspaceDto } from './dto/workspace.dto'

@Controller('workspaces')
export class WorkspacesController {
	constructor(private readonly workspacesService: WorkspacesService) {}

	// Endpoint para listar todos los workspaces
	@Get()
	async findAll() {
		return this.workspacesService.findAll()
	}

	// Endpoint para obtener un workspace por su ID
	@Get(':id')
	async findById(@Param('id') id: number) {
		return this.workspacesService.findById(id)
	}

	// Endpoint para crear un nuevo workspace
	@Post()
	async create(@Body() data: CreateWorkspaceDto) {
		return this.workspacesService.create(data)
	}

	// Endpoint para actualizar un workspace
	@Post(':id')
	async update(@Param('id') id: number, @Body() changes: CreateWorkspaceDto) {
		return this.workspacesService.update(id, changes)
	}

	// Endpoint para eliminar un workspace
	@Delete(':id')
	async delete(@Param('id') id: number) {
		return this.workspacesService.delete(id)
	}
}
