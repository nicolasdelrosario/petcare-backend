// NestJS
import { Module } from '@nestjs/common'

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm'

// Controllers
import { PetController } from './pet.controller'

// Services
import { PetService } from './pet.service'

// Entities
import { Pet } from './entities/pet.entity'

import { OwnerModule } from 'src/owner/owner.module'
import { UserModule } from 'src/user/user.module'

@Module({
	imports: [TypeOrmModule.forFeature([Pet]), OwnerModule, UserModule],
	controllers: [PetController],
	providers: [PetService],
	exports: [PetService],
})
export class PetModule {}
