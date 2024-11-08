// NestJS
import { Module } from '@nestjs/common'

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm'

// Controllers
import { OwnersController } from './owners.controller'

// Services
import { OwnersService } from './owners.service'

// Entities
import { Owner } from './entities/owner.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Owner])],
	controllers: [OwnersController],
	providers: [OwnersService],
	exports: [TypeOrmModule],
})
export class OwnersModule {}
