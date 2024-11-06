// NestJS
import { Controller, Get, Put, Patch, Body, Param } from '@nestjs/common'

// Services
import { UsersService } from './users.service'

// DTOs
import { UpdateUserDto } from './dto/user.dto'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	// Endpoint para listar todos los usuarios
	@Get()
	async findAll() {
		return this.usersService.findAll()
	}

	// Endpoint para obtener un usuario por su ID
	@Get(':id')
	async findById(@Param('id') id: number) {
		return this.usersService.findById(id)
	}

	// Endpoint para actualizar un usuario
	@Put(':id')
	async update(@Param('id') id: number, @Body() changes: UpdateUserDto) {
		return this.usersService.updateUser(id, changes)
	}

	// Endpoint para eliminar un usuario (soft delete)
	@Patch(':id')
	async delete(@Param('id') id: number) {
		return this.usersService.softDelete(id)
	}
}
