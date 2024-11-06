// Validations
import { IsNotEmpty, IsString } from 'class-validator'

// API Documentation
import { ApiProperty, PartialType } from '@nestjs/swagger'

export class CreateRoleDto {
	@ApiProperty({ description: 'Nombre del rol, puede ser "Admin" o "User"' })
	@IsNotEmpty()
	@IsString()
	readonly name: string
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
