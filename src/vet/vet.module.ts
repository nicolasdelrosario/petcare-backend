// NestJS
import { Module } from '@nestjs/common'

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm'

// Controllers
import { VetController } from './vet.controller'

// Services
import { VetService } from './vet.service'

// Entities
import { Vet } from './entities/vet.entity'
import { User } from 'src/user/entities/user.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Vet]), User],
	controllers: [VetController],
	providers: [VetService],
	exports: [VetService],
})
export class VetModule {}
