// NestJS
import {
	Controller,
	Get,
	Put,
	Body,
	Param,
	ParseIntPipe,
	Delete,
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

// Decorators
import { ApiTagsAndBearer } from '../common/decorators/api-tags-and-bearer.decorator'

@ApiTagsAndBearer('Users')
@Auth(Role.USER)
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	// Endpoint para listar todos los usuarios
	@Get()
	async findAll(): Promise<User[]> {
		return this.usersService.findAll()
	}

	// Endpoint para obtener un usuario por su email
	@Get('email/:email')
	async findOneByEmail(@Param('email') email: string): Promise<User> {
		return this.usersService.findOneByEmail(email)
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

	// Endpoint para eliminar un usuario
	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number): Promise<User> {
		return this.usersService.remove(id)
	}
}
