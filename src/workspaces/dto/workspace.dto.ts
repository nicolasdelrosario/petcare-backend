// Validations
import { IsNotEmpty, IsString } from 'class-validator'

// API Documentation
import { ApiProperty, PartialType } from '@nestjs/swagger'

export class CreateWorkspaceDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({ description: 'Nombre del Workspace' })
	name: string
}

export class UpdateWorkspaceDto extends PartialType(CreateWorkspaceDto) {}
