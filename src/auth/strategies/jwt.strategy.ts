// NestJS
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

// Passport
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

// Interfaces
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('JWT_SECRET'),
		})
	}

	async validate(payload: JwtPayload) {
		return {
			id: payload.sub,
			email: payload.username,
			roles: payload.roles,
		}
	}
}
