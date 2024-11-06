// NestJS
import { Module } from '@nestjs/common'

// Config
import { ConfigModule, ConfigService } from '@nestjs/config'

// Jwt
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategies/jwt.strategy'

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
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET'),
				signOptions: { expiresIn: '1h' },
			}),
		}),
		UsersModule,
	],
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule {}
