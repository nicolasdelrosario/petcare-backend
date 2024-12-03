// NestJS
import {
	Controller,
	Get,
	Post,
	Put,
	Body,
	Param,
	ParseIntPipe,
	Delete,
} from '@nestjs/common'

//Auth
import { Auth } from 'src/auth/decorators/auth.decorator'

// Roles
import { Role } from 'src/common/enums/role.enum'

// Services
import { OwnersService } from './owners.service'

// Decorators
import { ActiveUser } from 'src/common/decorators/active-user-decorator'

// Interfaces
import { UserActiveI } from 'src/common/interfaces/user-active-interface'

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
	async findAll(@ActiveUser() user: UserActiveI) {
		return await this.ownersService.findAll(user)
	}

	// Endpoint para listar un propietario por ID
	@Get(':id')
	async findById(
		@Param('id', ParseIntPipe) id: number,
		@ActiveUser() user: UserActiveI,
	) {
		return await this.ownersService.findOneById(id, user)
	}

	// Endpoint para crear un propietario
	@Post()
	async create(
		@Body() createOwnerDto: CreateOwnerDto,
		@ActiveUser() user: UserActiveI,
	) {
		return await this.ownersService.createOwner(createOwnerDto, user)
	}

	// Endpoint para actualizar un propietario
	@Put(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateOwnerDto: UpdateOwnerDto,
		@ActiveUser() user: UserActiveI,
	) {
		return await this.ownersService.updateOwner(id, updateOwnerDto, user)
	}

	// Endpoint para eliminar un propietario
	@Delete(':id')
	async softDelete(
		@Param('id', ParseIntPipe) id: number,
		@ActiveUser() user: UserActiveI,
	) {
		return await this.ownersService.softDelete(id, user)
	}
}
