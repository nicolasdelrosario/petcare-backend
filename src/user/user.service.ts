// NestJS
import {
	Injectable,
	NotFoundException,
	ConflictException,
	BadRequestException,
	UnauthorizedException,
} from '@nestjs/common'

// TypeORM
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'

// Services
import { VetService } from 'src/vet/vet.service'

// Entities
import { User } from './entities/user.entity'

// DTOs
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'

import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto'
import { JwtPayload } from './interfaces/jwt-payload.interface'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,

		private readonly jwtService: JwtService,
		private vetService: VetService,
	) {}

	findAll() {
		return this.userRepository.find({
			where: { deletedAt: IsNull() },
			relations: ['vet'],
		})
	}

	async findOne(id: number): Promise<User> {
		return this.findUser(id)
	}

	async create(data: CreateUserDto) {
		const { password, ...userDate } = data

		const user = this.userRepository.create({
			...userDate,
			password: bcrypt.hashSync(password, 10),
		})

		if (data.vetId) {
			const vet = await this.vetService.findVet(data.vetId)
			user.vet = vet
		}

		try {
			await this.userRepository.save(user)
		} catch (error) {
			this.handleError(error)
		}

		delete user.password

		return {
			...user,
			token: this.getJwtToken({ id: user.id }),
		}
	}

	async update(id: number, changes: UpdateUserDto): Promise<User> {
		await this.findUser(id)
		try {
			await this.userRepository.update(id, changes)
			return this.findUser(id)
		} catch (error) {
			this.handleError(error)
		}
	}

	async softDelete(id: number): Promise<void> {
		const user = await this.findUser(id)
		user.deletedAt = new Date()
		await this.userRepository.save(user)
	}

	public async findUser(id: number): Promise<User> {
		const user = await this.userRepository.findOne({
			relations: ['userRol', 'vet'],
			where: { id },
		})

		if (!user) throw new NotFoundException(`User with id #${id} wasn't found.`)

		return user
	}

	async login(data: LoginUserDto) {
		const { password, email } = data

		const user = await this.userRepository.findOne({
			where: { email },
			select: { email: true, password: true, id: true, name: true },
			relations: ['vet'],
		})

		if (!user) throw new UnauthorizedException('Credentials are invalid.')

		if (!bcrypt.compareSync(password, user.password))
			throw new UnauthorizedException('Credentials are invalid.')

		return {
			...user,
			token: this.getJwtToken({ id: user.id }),
		}
	}

	async checkAuthStatus(user: User) {
		return {
			...user,
			token: this.getJwtToken({ id: user.id }),
		}
	}

	private getJwtToken(payload: JwtPayload) {
		const token = this.jwtService.sign(payload)
		return token
	}

	private handleError(error: any) {
		if (error.code === '23505')
			throw new ConflictException('Duplicate field detected.')

		throw new BadRequestException(error.message)
	}
}
