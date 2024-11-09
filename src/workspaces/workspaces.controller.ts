// NestJS
import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Put,
	ParseIntPipe,
	Patch,
} from '@nestjs/common'

// Services
import { WorkspacesService } from './workspaces.service'

// DTOs
import { CreateWorkspaceDto } from './dto/workspace.dto'

// Entities
import { Workspace } from './entities/workspace.entity'

// Api Documentation
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Workspaces')
@Controller('workspaces')
export class WorkspacesController {
	constructor(private readonly workspacesService: WorkspacesService) {}

	// Endpoint para listar todos los workspaces
	@Get()
	async findAll(): Promise<Workspace[]> {
		return this.workspacesService.findAll()
	}

	// Endpoint para obtener un workspace por su ID
	@Get(':id')
	async findById(@Param('id', ParseIntPipe) id: number): Promise<Workspace> {
		return this.workspacesService.findById(id)
	}

	// Endpoint para crear un nuevo workspace
	@Post()
	async create(@Body() data: CreateWorkspaceDto): Promise<Workspace> {
		return this.workspacesService.create(data)
	}

	// Endpoint para actualizar un workspace
	@Put(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() changes: CreateWorkspaceDto,
	): Promise<Workspace> {
		return this.workspacesService.update(id, changes)
	}

	// Endpoint para eliminar un workspace
	@Patch(':id')
	async delete(@Param('id', ParseIntPipe) id: number): Promise<Workspace> {
		return this.workspacesService.softDelete(id)
	}
}
