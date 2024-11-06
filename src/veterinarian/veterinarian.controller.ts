// NestJS
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
import { VeterinarianService } from './veterinarian.service'

// DTOS
import {
	CreateVeterinarianDto,
	UpdateVeterinarianDto,
} from './dto/veterinarian.dto'

// API Documentation
import { ApiTags } from '@nestjs/swagger'

import { Auth } from 'src/user/decorators/auth.decorator'

@ApiTags('Veterinarian')
@Auth()
@Controller('veterinarians')
export class VeterinarianController {
	constructor(private readonly veterinarianService: VeterinarianService) {}

	@Get()
	getOwners() {
		return this.veterinarianService.findAll()
	}

	@Get(':id')
	getOwner(@Param('id', ParseIntPipe) id: number) {
		return this.veterinarianService.findOne(id)
	}

	@Post()
	create(@Body() data: CreateVeterinarianDto) {
		return this.veterinarianService.create(data)
	}

	@Put(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() changes: UpdateVeterinarianDto,
	) {
		return this.veterinarianService.update(id, changes)
	}

	@Patch(':id')
	softDelete(@Param('id', ParseIntPipe) id: number) {
		return this.veterinarianService.softDelete(id)
	}
}
