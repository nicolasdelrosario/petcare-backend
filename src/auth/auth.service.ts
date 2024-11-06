// NestJS
import { Injectable, UnauthorizedException } from '@nestjs/common'

// TypeORM
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

// Jwt
import { JwtService } from '@nestjs/jwt'

// BCrypt
import * as bcrypt from 'bcrypt'

// Entities
import { User } from 'src/users/entities/user.entity'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(
		email: string,
		password: string,
	): Promise<Omit<User, 'password'> | null> {
		const user = await this.userRepository.findOne({
			where: { email },
			relations: ['roles'],
		})

		if (user && (await bcrypt.compare(password, user.password))) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...result } = user
			return result
		}

		throw new UnauthorizedException('Invalid credentials')
	}

	async login(user: Omit<User, 'password'>) {
		const payload = { username: user.email, sub: user.id, roles: user.roles }
		return {
			access_token: this.jwtService.sign(payload),
		}
	}
}
