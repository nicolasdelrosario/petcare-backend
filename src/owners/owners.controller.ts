// NestJS
import {
	Controller,
	Get,
	Post,
	Put,
	Patch,
	Body,
	Param,
	ParseIntPipe,
} from '@nestjs/common'

//Auth
import { Auth } from 'src/auth/decorators/auth.decorator'

// Roles
import { Role } from 'src/common/enums/role.enum'

// Services
import { OwnersService } from './owners.service'

// Entities
import { Owner } from './entities/owner.entity'

// DTOs
import { CreateOwnerDto, UpdateOwnerDto } from './dto/owner.dto'

// Decorators
import { ApiTagsAndBearer } from '../common/decorators/api-tags-and-bearer.decorator'

@ApiTagsAndBearer('Owners')
@Auth(Role.USER)
@Controller('owners')
export class OwnersController {
	constructor(private readonly ownersService: OwnersService) {}

	// Endpoint para listar los propietarios
	@Get()
	async findAll(): Promise<Owner[]> {
		return await this.ownersService.findAll()
	}

	// Endpoint para listar un propietario por ID
	@Get(':id')
	async findById(@Param('id', ParseIntPipe) id: number): Promise<Owner> {
		return await this.ownersService.findById(id)
	}

	// Endpoint para crear un propietario
	@Post()
	async create(@Body() data: CreateOwnerDto): Promise<Owner> {
		return await this.ownersService.createOwner(data)
	}

	// Endpoint para actualizar un propietario
	@Put(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() changes: UpdateOwnerDto,
	): Promise<Owner> {
		return await this.ownersService.updateOwner(id, changes)
	}

	// Endpoint para eliminar un propietario
	@Patch(':id')
	async softDelete(@Param('id', ParseIntPipe) id: number): Promise<Owner> {
		return await this.ownersService.softDelete(id)
	}
}
