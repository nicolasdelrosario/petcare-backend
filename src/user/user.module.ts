// NestJS
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm'

// Controllers
import { UserController } from './user.controller'

// Services
import { UserService } from './user.service'

// Entities
import { User } from './entities/user.entity'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategies/jwt.strategy'
import { VetModule } from 'src/vet/vet.module'

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		PassportModule.register({ defaultStrategy: 'jwt' }),

		JwtModule.registerAsync({
			imports: [],
			inject: [],
			useFactory: () => {
				return {
					secret: process.env.JWT_SECRET,
					signOptions: { expiresIn: '2h' },
				}
			},
		}),
		VetModule,
	],
	controllers: [UserController],
	providers: [UserService, JwtStrategy],
	exports: [TypeOrmModule, UserService, JwtStrategy, PassportModule, JwtModule],
})
export class UserModule {}
