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

// Roles
// import { Role } from 'src/common/enums/role.enum'

// Services
import { WorkspacesService } from './workspaces.service'

// DTOs
import { CreateWorkspaceDto } from './dto/workspace.dto'

// Entities
import { Workspace } from './entities/workspace.entity'

// Decorators
// import { Auth } from 'src/auth/decorators/auth.decorator'
// import { ApiTagsAndBearer } from '../common/decorators/api-tags-and-bearer.decorator.ts'

// @ApiTagsAndBearer('Workspaces')
// @Auth(Role.USER)
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
