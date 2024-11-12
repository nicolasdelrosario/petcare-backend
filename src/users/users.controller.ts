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

//Auth
import { Auth } from 'src/auth/decorators/auth.decorator'

// Services
import { UsersService } from './users.service'

// Entities
import { User } from './entities/user.entity'

// DTOs
import { UpdateUserDto } from './dto/user.dto'

// Roles
import { Role } from 'src/common/enums/role.enum'

// Api Documentation
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Users')
@Auth(Role.ADMIN)
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

	// Endpoint para eliminar un usuario (softRemove)
	@Patch(':id')
	async remove(@Param('id', ParseIntPipe) id: number): Promise<User> {
		return this.usersService.remove(id)
	}
}
