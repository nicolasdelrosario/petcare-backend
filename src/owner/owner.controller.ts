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
import { OwnerService } from './owner.service'

// DTOS
import { CreateOwnerDto } from './dto/owner.dto'
import { UpdateOwnerDto } from './dto/owner.dto'

// API Documentation
import { ApiTags } from '@nestjs/swagger'

import { Auth } from 'src/user/decorators/auth.decorator'

@ApiTags('Owner')
@Auth()
@Controller('owners')
export class OwnerController {
	constructor(private ownerService: OwnerService) {}

	@Get()
	getOwners() {
		return this.ownerService.findAll()
	}

	@Get(':id')
	getOwner(@Param('id', ParseIntPipe) id: number) {
		return this.ownerService.findOne(id)
	}

	@Post()
	create(@Body() data: CreateOwnerDto) {
		return this.ownerService.create(data)
	}

	@Put(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() changes: UpdateOwnerDto,
	) {
		return this.ownerService.update(id, changes)
	}

	@Patch(':id')
	softDelete(@Param('id', ParseIntPipe) id: number) {
		return this.ownerService.softDelete(id)
	}
}
