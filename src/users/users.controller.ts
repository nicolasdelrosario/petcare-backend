// NestJS
import {
	Controller,
	Get,
	Put,
	Patch,
	Body,
	Param,
	ParseIntPipe,
} from '@nestjs/common'

// Services
import { UsersService } from './users.service'

// Entities
import { User } from './entities/user.entity'

// DTOs
import { UpdateUserDto } from './dto/user.dto'

// Api Documentation
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	// Endpoint para listar todos los usuarios
	@Get()
	async findAll(): Promise<User[]> {
		return this.usersService.findAll()
	}

	// Endpoint para obtener un usuario por su ID
	@Get(':id')
	async findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
		return this.usersService.findById(id)
	}

	// Endpoint para actualizar un usuario
	@Put(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() changes: UpdateUserDto,
	): Promise<User> {
		return this.usersService.updateUser(id, changes)
	}

	// Endpoint para eliminar un usuario (soft delete)
	@Patch(':id')
	async delete(@Param('id', ParseIntPipe) id: number): Promise<User> {
		return this.usersService.softDelete(id)
	}
}
