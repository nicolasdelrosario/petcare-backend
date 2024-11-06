// NestJS
import { Module } from '@nestjs/common'

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm'

// Controllers
import { OwnerController } from './owner.controller'

// Services
import { OwnerService } from './owner.service'

// Entities
import { Owner } from './entities/owner.entity'

import { UserModule } from 'src/user/user.module'

@Module({
	imports: [TypeOrmModule.forFeature([Owner]), UserModule],
	controllers: [OwnerController],
	providers: [OwnerService],
	exports: [OwnerService, TypeOrmModule],
})
export class OwnerModule {}
