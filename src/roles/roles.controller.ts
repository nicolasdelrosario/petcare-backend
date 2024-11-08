// NestJS
import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	ParseIntPipe,
} from '@nestjs/common'

// Services
import { RolesService } from './roles.service'

// DTOs
import { CreateRoleDto } from './dto/role.dto'

// Api Documentation
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
	constructor(private readonly roleService: RolesService) {}

	// Endpoint para listar todos los roles
	@Get()
	async findAll() {
		return this.roleService.findAll()
	}

	// Endpoint para buscar un rol por su ID
	@Get(':id')
	async findById(@Param('id', ParseIntPipe) id: number) {
		return this.roleService.findById(id)
	}

	// Endpoint para crear un nuevo rol
	@Post()
	async create(@Body() data: CreateRoleDto) {
		return this.roleService.createRole(data)
	}
}
