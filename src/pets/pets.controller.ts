// NestJS
import {
	Controller,
	Get,
	Post,
	Patch,
	Body,
	Param,
	Put,
	ParseIntPipe,
} from '@nestjs/common'

// Services
import { PetsService } from './pets.service'

// Entities
import { Pet } from './entities/pet.entity'

// DTOs
import { CreatePetDto, UpdatePetDto } from './dto/pet.dto'

// Api Documentation
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Pets')
@Controller('pets')
export class PetsController {
	constructor(private readonly petsService: PetsService) {}

	// Endpoint para obtener todas las mascotas
	@Get()
	findAll(): Promise<Pet[]> {
		return this.petsService.findAll()
	}

	// Endpoint para obtener una mascota por su ID
	@Get(':id')
	findById(@Param('id', ParseIntPipe) id: number): Promise<Pet> {
		return this.petsService.findById(id)
	}

	// Endpoint para crear una nueva mascota
	@Post()
	create(@Body() data: CreatePetDto): Promise<Pet> {
		return this.petsService.createPet(data)
	}

	// Endpoint para actualizar una mascota
	@Put(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() changes: UpdatePetDto,
	): Promise<Pet> {
		return this.petsService.updatePet(id, changes)
	}

	// Endpoint para eliminar una mascota
	@Patch(':id')
	delete(@Param('id', ParseIntPipe) id: number) {
		return this.petsService.softDelete(id)
	}
}
