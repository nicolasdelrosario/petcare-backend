// NestJS
import { Module } from '@nestjs/common'

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm'

// Controllers
import { UsersController } from './users.controller'

// Services
import { UsersService } from './users.service'

// Entities
import { User } from './entities/user.entity'
import { Workspace } from 'src/workspaces/entities/workspace.entity'
import { Role } from 'src/roles/entities/role.entity'

@Module({
	imports: [TypeOrmModule.forFeature([User, Workspace, Role])],
	providers: [UsersService],
	controllers: [UsersController],
	exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
