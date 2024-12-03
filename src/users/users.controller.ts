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

// Decorators
import { ActiveUser } from 'src/common/decorators/active-user-decorator'

// Interfaces
import { UserActiveI } from 'src/common/interfaces/user-active-interface'

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
	async findAll(@ActiveUser() user: UserActiveI) {
		return this.usersService.findAll(user)
	}

	// Endpoint para obtener un usuario por su ID
	@Get(':id')
	async findOneById(
		@Param('id', ParseIntPipe) id: number,
		@ActiveUser() user: UserActiveI,
	) {
		return this.usersService.findOneById(id, user)
	}

	// Endpoint para actualizar un usuario
	@Put(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateUserDto: UpdateUserDto,
		@ActiveUser() user: UserActiveI,
	) {
		return this.usersService.updateUser(id, updateUserDto, user)
	}

	// Endpoint para eliminar un usuario
	@Delete(':id')
	async remove(
		@Param('id', ParseIntPipe) id: number,
		@ActiveUser() user: UserActiveI,
	) {
		return this.usersService.remove(id, user)
	}
}
