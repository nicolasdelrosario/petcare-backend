// NestJS
import { Module } from '@nestjs/common'

// Jwt
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants/jwt.constants'

// Modules
import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'

// Controllers
import { AuthController } from './auth.controller'

// Services
import { AuthService } from './auth.service'

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			global: true,
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '1d' },
		}),
		UsersModule,
	],
	providers: [AuthService],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule {}
