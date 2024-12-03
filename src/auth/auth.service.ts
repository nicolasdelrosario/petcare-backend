// NestJS
import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'

// Jwt
import { JwtService } from '@nestjs/jwt'

// Bcryptjs
import * as bcryptjs from 'bcryptjs'

// Services
import { UsersService } from 'src/users/users.service'

// DTOs
import { CreateUserDto } from 'src/users/dto/user.dto'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async register(createUserDto: CreateUserDto) {
		const { email, password, ...data } = createUserDto

		const existingUser = await this.usersService.findOneByEmail(email)
		if (existingUser) throw new BadRequestException('User already exists')

		const hashedPassword = await bcryptjs.hash(password, 10)
		const newUser = await this.usersService.createUser({
			email,
			password: hashedPassword,
			...data,
		})

		const token = await this.generateToken(newUser)

		return {
			name: newUser.name,
			token,
			userId: newUser.id,
			workspaceId: newUser.workspace?.id,
		}
	}

	async login(loginDto: LoginDto) {
		const { email, password } = loginDto

		const user = await this.usersService.findByEmailWithPassword(email)
		if (!user) throw new UnauthorizedException('Email or password is wrong')

		const isPasswordValid = await bcryptjs.compareSync(password, user.password)
		if (!isPasswordValid)
			throw new UnauthorizedException('Email or password is wrong')

		const token = await this.generateToken(user)

		return {
			name: user.name,
			token,
			userId: user.id,
			workspaceId: user.workspace?.id,
		}
	}

	private async generateToken(user) {
		const payload = {
			email: user.email,
			role: user.role,
			userId: user.id,
			workspaceId: user.workspace?.id,
		}

		return this.jwtService.signAsync(payload)
	}
}
