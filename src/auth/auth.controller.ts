// NestJS
import { Controller, Post, Body } from '@nestjs/common'

// Services
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'

// DTOs
import { LoginDto } from './dto/login.dto'
import { CreateUserDto } from 'src/users/dto/user.dto'

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService,
	) {}

	// Endpoint de registro
	@Post('register')
	async register(@Body() data: CreateUserDto) {
		return this.usersService.createUser(data)
	}

	// Endpoint de inicio de sesión
	@Post('login')
	async login(@Body() data: LoginDto) {
		const user = await this.authService.validateUser(data.email, data.password)
		return this.authService.login(user)
	}
}
