// NestJS
import { Module } from '@nestjs/common'

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm'

// Modules
import { OwnersModule } from 'src/owners/owners.module'

// Controllers
import { PetsController } from './pets.controller'

// Services
import { PetsService } from './pets.service'

// Entities
import { Pet } from './entities/pet.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Pet]), OwnersModule],
	controllers: [PetsController],
	providers: [PetsService],
	exports: [TypeOrmModule],
})
export class PetsModule {}
