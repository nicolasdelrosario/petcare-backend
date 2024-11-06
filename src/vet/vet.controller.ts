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
import { VetService } from './vet.service'

// DTOS
import { CreateVetDto } from './dto/vet.dto'
import { UpdateVetDto } from './dto/vet.dto'

// API Documentation
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Vet (Workspace)')
@Controller('vets')
export class VetController {
	constructor(private vetService: VetService) {}

	@Get()
	getOwners() {
		return this.vetService.findAll()
	}

	@Get(':id')
	getOwner(@Param('id', ParseIntPipe) id: number) {
		return this.vetService.findOne(id)
	}

	@Post()
	create(@Body() data: CreateVetDto) {
		return this.vetService.create(data)
	}

	@Put(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() changes: UpdateVetDto) {
		return this.vetService.update(id, changes)
	}

	@Patch(':id')
	softDelete(@Param('id', ParseIntPipe) id: number) {
		return this.vetService.softDelete(id)
	}
}
