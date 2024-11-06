import {
	Body,
	Controller,
	Get,
	Post,
	Put,
	Patch,
	Param,
	ParseIntPipe,
} from '@nestjs/common'

// Services
import { PetService } from './pet.service'

// DTOs
import { CreatePetDto, UpdatePetDto } from './dto/pet.dto'

// API Documentation
import { ApiTags } from '@nestjs/swagger'

import { Auth } from 'src/user/decorators/auth.decorator'

@ApiTags('Pet')
@Auth()
@Controller('pets')
export class PetController {
	constructor(private petService: PetService) {}

	@Get()
	getOwners() {
		return this.petService.findAll()
	}

	@Get(':id')
	getOwner(@Param('id', ParseIntPipe) id: number) {
		return this.petService.findOne(id)
	}

	@Post()
	create(@Body() data: CreatePetDto) {
		return this.petService.create(data)
	}

	@Put(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() changes: UpdatePetDto) {
		return this.petService.update(id, changes)
	}

	@Patch(':id')
	softDeleteUser(@Param('id', ParseIntPipe) id: number) {
		return this.petService.softDelete(id)
	}
}
