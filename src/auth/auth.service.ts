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

	async register({ email, password, ...data }: CreateUserDto) {
		const user = await this.usersService.findOneByEmail(email)

		if (user) throw new BadRequestException('User already exists')

		return await this.usersService.createUser({
			email,
			password: await bcryptjs.hash(password, 10),
			...data,
		})
	}

	async login({ email, password }: LoginDto) {
		const user = await this.usersService.findByEmailWithPassword(email)

		if (!user) throw new UnauthorizedException('Email or password is wrong')

		const isPasswordValid = await bcryptjs.compare(password, user.password)

		if (!isPasswordValid)
			throw new UnauthorizedException('Email or password is wrong')

		const payload = { email: user.email, role: user.role }

		const token = await this.jwtService.signAsync(payload)

		return {
			token,
			email,
		}
	}
}
