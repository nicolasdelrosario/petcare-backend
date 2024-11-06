// NestJS
import { Module } from '@nestjs/common'

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm'

// Controllers
import { RolesController } from './roles.controller'

// Services
import { RolesService } from './roles.service'

// Entities
import { Role } from './entities/role.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Role])],
	providers: [RolesService],
	controllers: [RolesController],
	exports: [RolesService],
})
export class RolesModule {}
