// NestJS
import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Put,
	ParseIntPipe,
	Delete,
} from '@nestjs/common'

//Auth
import { Auth } from 'src/auth/decorators/auth.decorator'

// Services
import { PetsService } from './pets.service'

// Decorators
import { ActiveUser } from 'src/common/decorators/active-user-decorator'

// Interfaces
import { UserActiveI } from 'src/common/interfaces/user-active-interface'

// DTOs
import { CreatePetDto, UpdatePetDto } from './dto/pet.dto'

// Roles
import { Role } from 'src/common/enums/role.enum'

// Decorators
import { ApiTagsAndBearer } from '../common/decorators/api-tags-and-bearer.decorator'

@ApiTagsAndBearer('Pets')
@Auth(Role.USER)
@Controller('pets')
export class PetsController {
	constructor(private readonly petsService: PetsService) {}

	// Endpoint para obtener todas las mascotas
	@Get()
	findAll(@ActiveUser() user: UserActiveI) {
		return this.petsService.findAll(user)
	}

	// Endpoint para obtener una mascota por su ID
	@Get(':id')
	findOneById(
		@Param('id', ParseIntPipe) id: number,
		@ActiveUser() user: UserActiveI,
	) {
		return this.petsService.findOneById(id, user)
	}

	// Endpoint para crear una nueva mascota
	@Post()
	create(@Body() createPetDto: CreatePetDto, @ActiveUser() user: UserActiveI) {
		return this.petsService.createPet(createPetDto, user)
	}

	// Endpoint para actualizar una mascota
	@Put(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updatePetDto: UpdatePetDto,
		@ActiveUser() user: UserActiveI,
	) {
		return this.petsService.updatePet(id, updatePetDto, user)
	}

	// Endpoint para eliminar una mascota
	@Delete(':id')
	delete(
		@Param('id', ParseIntPipe) id: number,
		@ActiveUser() user: UserActiveI,
	) {
		return this.petsService.softDelete(id, user)
	}
}
