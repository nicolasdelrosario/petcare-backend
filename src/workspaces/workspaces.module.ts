// NestJS
import { Module, forwardRef } from '@nestjs/common'

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm'

// Module
import { UsersModule } from '../users/users.module'

// Controllers
import { WorkspacesController } from './workspaces.controller'

// Services
import { WorkspacesService } from './workspaces.service'

// Entities
import { Workspace } from './entities/workspace.entity'

@Module({
	imports: [
		TypeOrmModule.forFeature([Workspace]),
		forwardRef(() => UsersModule),
	],
	providers: [WorkspacesService],
	controllers: [WorkspacesController],
	exports: [WorkspacesService],
})
export class WorkspacesModule {}
