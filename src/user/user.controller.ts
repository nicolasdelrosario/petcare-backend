// NestJS
import {
	Body,
	Controller,
	Get,
	Post,
	Put,
	Patch,
	Param,
	ParseIntPipe,
	UseGuards,
} from '@nestjs/common'

// Services
import { UserService } from './user.service'

// DTOs
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'

// API Documentation
import { ApiTags } from '@nestjs/swagger'
import { LoginUserDto } from './dto/login-user.dto'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from './decorators/get-user.decorator'
import { User } from './entities/user.entity'
import { RawHeaders } from './decorators/raw-headers.decorator'
import { UserRoleGuard } from './guards/user-role/user-role.guard'
import { RoleProtected } from './decorators/role-protected/role-protected.decorator'
import { ValidRoles } from './interfaces/valid-roles'
import { Auth } from './decorators/auth.decorator'

@ApiTags('User')
@Controller('auth')
export class UserController {
	constructor(private userService: UserService) {}

	@Post('register')
	createUser(@Body() data: CreateUserDto) {
		return this.userService.create(data)
	}

	@Post('login')
	loginUser(@Body() data: LoginUserDto) {
		return this.userService.login(data)
	}

	@Get('check-status')
	@Auth()
	checkAuthStatus(@GetUser() user: User) {
		return this.userService.checkAuthStatus(user)
	}

	@Put(':id')
	@Auth(ValidRoles.admin)
	updateUser(
		@Param('id', ParseIntPipe) id: number,
		@Body() changes: UpdateUserDto,
	) {
		return this.userService.update(id, changes)
	}

	@Patch(':id')
	@Auth(ValidRoles.admin)
	softDeleteUser(@Param('id', ParseIntPipe) id: number) {
		return this.userService.softDelete(id)
	}
}
