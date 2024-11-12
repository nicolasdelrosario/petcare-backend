// NestJS
import { Controller, Post, Body } from '@nestjs/common'

// Services
import { AuthService } from './auth.service'

// DTOs
import { LoginDto } from './dto/login.dto'
import { CreateUserDto } from 'src/users/dto/user.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	// Endpoint de registro
	@Post('register')
	async register(@Body() createUserDto: CreateUserDto) {
		return this.authService.register(createUserDto)
	}

	// Endpoint de inicio de sesión
	@Post('login')
	async login(@Body() loginDto: LoginDto) {
		return this.authService.login(loginDto)
	}
}
